import {
  Account,
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
  ContractFunction,
  Interaction,
  SmartContract,
  TokenTransfer,
  Transaction,
  TransactionPayload,
} from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import { sendMultipleTransactions } from "..";
import { selectedNetwork } from "../../../../../config/network";
import { store } from "../../../../redux/store";
import { INft } from "../../../../redux/types/tokens.interface";

export const stakeNfts = async (
  nfts: INft[],
  poolStruct,
  amountNftsStaked: number
) => {
  let payment = 0;

  if (nfts.length > 1) {
    payment = nfts.length * 5;
  }

  // if (amountNftsStaked >= 10) {
  //   payment = nfts.length * 0.001;
  // }

  const transactions: Transaction[] = [];

  const sender = store.getState().settings.userAddress;
  const senderAddress = new Address(sender);
  for (let i = 0; i < nfts.length; i++) {
    const nft = nfts[i];

    const contract = new SmartContract({ address: new Address(selectedNetwork.contractAddr.nftsStaking)});
    let interaction = new Interaction(contract, new ContractFunction("stakeNft"), [
        poolStruct,
        BytesValue.fromUTF8(nft?.media[0]?.url || ""),
        BytesValue.fromUTF8(nft?.name || ""),
    ]);
  
    let tx = interaction
      .withSender(senderAddress)
      .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
      .withSingleESDTNFTTransfer(TokenTransfer.semiFungible(nft.collection, nft.nonce, 1))
      .withExplicitReceiver(senderAddress)
      .withGasLimit(70000000)
      .withChainID(selectedNetwork.shortId)
      .buildTransaction();
    
    transactions.push(tx);
  }

  if (selectedNetwork.tokens?.MERMAID.identifier && payment > 0) {
    const tokenIdentifier = selectedNetwork.tokens.MERMAID.identifier;
    const multiplyier = Math.pow(10, selectedNetwork.tokens.MERMAID.decimals);
    const finalValue = Number(payment) * multiplyier;

    const receiverAddress = new Address("erd10fq6af9vkr6usqc4wf9adsqhdvfz7d0d57pkag5ecmac7486zncsunge5m");

    const contract = new SmartContract({ address: new Address(receiverAddress)});
    let interaction = new Interaction(contract, new ContractFunction("fee"),
      [
        BytesValue.fromUTF8(tokenIdentifier),
        new BigUIntValue(new BigNumber(finalValue)),
      ]
    );

    let tx = interaction
      .withSender(senderAddress)
      .useThenIncrementNonceOf(new Account(senderAddress))
      .withSingleESDTTransfer(TokenTransfer.fungibleFromBigInteger(tokenIdentifier, finalValue, selectedNetwork.tokens?.MERMAID?.decimals))
      .withGasLimit(70000000)
      .withChainID(selectedNetwork.shortId)
      .buildTransaction();

    transactions.push(tx);
  }
  return await sendMultipleTransactions({ txs: transactions });
};
