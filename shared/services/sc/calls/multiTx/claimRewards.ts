import {
  Address,
  BigUIntValue,
  BytesValue,
  ContractFunction,
  Transaction,
  TransactionPayload,
} from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import { sendMultipleTransactions } from "..";
import { selectedNetwork } from "../../../../../config/network";
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
  if (selectedNetwork.tokens?.MERMAID?.identifier) {
    nfts.forEach((nft) => {
      const payload = TransactionPayload.contractCall()
        .setFunction(new ContractFunction("ESDTTransfer"))
        .setArgs([
          BytesValue.fromUTF8(tokenIdentifier),
          new BigUIntValue(new BigNumber(finalValue)),
          BytesValue.fromUTF8("claimRewards"),
          BytesValue.fromUTF8(nft.token),
          new BigUIntValue(new BigNumber(nft.nonce)),
        ])
        .build();

      const receiverAddress = new Address(
        selectedNetwork.contractAddr.nftsStaking
      );

      const tx = new Transaction({
        sender: senderAddress,
        value: 0,
        receiver: receiverAddress,
        data: payload,
        gasLimit: 70000000,
        chainID: selectedNetwork.shortId,
      });
      transactions.push(tx);
    });
  }

  return await sendMultipleTransactions({ txs: transactions });
};
