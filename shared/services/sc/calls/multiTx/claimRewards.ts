import {
  Account,
  Address,
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

export const claimUserRewards = async (
  nfts: { token: string; nonce: number }[]
) => {
  const transactions: Transaction[] = [];

  const sender = store.getState().settings.userAddress;
  const senderAddress = new Address(sender);

  const tokenIdentifier = selectedNetwork.tokens?.MERMAID?.identifier;
  const multiplyier = Math.pow(10, selectedNetwork.tokens?.MERMAID?.decimals);
  const finalValue = 5 * multiplyier;

  // if (selectedNetwork.tokens?.MERMAID?.identifier) {
  nfts.forEach((nft) => {
    const receiverAddress = new Address(
      selectedNetwork.contractAddr.nftsStaking
    );

    const contract = new SmartContract({ address: new Address(receiverAddress)});
    let interaction = new Interaction(contract, new ContractFunction("claimRewards"),
      [
        BytesValue.fromUTF8(nft.token),
        new BigUIntValue(new BigNumber(nft.nonce)),
      ]
    );

    let tx = interaction
      .withSender(senderAddress)
      .useThenIncrementNonceOf(new Account(senderAddress))
      // .withSingleESDTTransfer(TokenTransfer.fungibleFromBigInteger(tokenIdentifier, finalValue, selectedNetwork.tokens?.MERMAID?.decimals))
      .withGasLimit(70000000)
      .withValue(egldFee * Math.pow(10, 18))
      .withChainID(selectedNetwork.shortId)
      .buildTransaction();

    transactions.push(tx);
  });
  // }

  return await sendMultipleTransactions({ txs: transactions });
};
