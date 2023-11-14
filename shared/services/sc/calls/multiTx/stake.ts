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
import { egldFee, selectedNetwork } from "../../../../../config/network";
import { store } from "../../../../redux/store";
import { INft } from "../../../../redux/types/tokens.interface";

export const stakeNfts = async (
  nfts: INft[],
  poolStruct,
  amountNftsStaked: number
) => {
  // let payment = 0;

  // if (nfts.length > 1) {
  //   payment = nfts.length * 5;
  // }

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
      .useThenIncrementNonceOf(new Account(senderAddress))
      .withSingleESDTNFTTransfer(TokenTransfer.semiFungible(nft.collection, nft.nonce, 1))
      .withExplicitReceiver(senderAddress)
      .withGasLimit(70000000)
      .withChainID(selectedNetwork.shortId)
      .buildTransaction();
    
    transactions.push(tx);
  }

  const multiplyier = Math.pow(10, 18);
  const finalValue = egldFee * multiplyier;

  const receiverAddress = new Address("erd10fq6af9vkr6usqc4wf9adsqhdvfz7d0d57pkag5ecmac7486zncsunge5m");
  
  let tx = new Transaction({
    sender: senderAddress,
    receiver: receiverAddress,
    gasLimit: 5000000,
    chainID: selectedNetwork.shortId,
    value: finalValue,
    data: new TransactionPayload("Gas for operational costs"),
  });

  transactions.push(tx);

  return await sendMultipleTransactions({ txs: transactions });
};
