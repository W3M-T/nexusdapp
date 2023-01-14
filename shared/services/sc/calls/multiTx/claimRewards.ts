import {
  Address,
  BigUIntValue,
  BytesValue,
  ContractFunction,
  Transaction,
  TransactionPayload,
} from "@elrondnetwork/erdjs/out";
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
  nfts.forEach((nft) => {
    const payload = TransactionPayload.contractCall()
      .setFunction(new ContractFunction("claimRewards"))
      .setArgs([
        BytesValue.fromUTF8(nft.token),
        new BigUIntValue(new BigNumber(nft.nonce)),
      ])
      .build();

    const receiverAddress = new Address(
      selectedNetwork.contractAddr.nftsStaking
    );

    const tx = new Transaction({
      sender: senderAddress,
      value: 0.001 * Math.pow(10, 18),
      receiver: receiverAddress,
      data: payload,
      gasLimit: 70000000,
      chainID: selectedNetwork.shortId,
    });
    transactions.push(tx);
  });

  if (selectedNetwork.tokens?.MERMAID.identifier) {
    const tokenIdentifier = selectedNetwork.tokens.MERMAID.identifier;
    const multiplyier = Math.pow(10, selectedNetwork.tokens.MERMAID.decimals);
    const finalValue = 5 * multiplyier;
    const payload2 = TransactionPayload.contractCall()
      .setFunction(new ContractFunction("ESDTTransfer"))
      .setArgs([
        BytesValue.fromUTF8(tokenIdentifier),
        new BigUIntValue(new BigNumber(finalValue)),
      ])
      .build();

    const tx = new Transaction({
      sender: senderAddress,
      receiver: new Address(
        "erd10fq6af9vkr6usqc4wf9adsqhdvfz7d0d57pkag5ecmac7486zncsunge5m"
      ),
      value: 0,
      data: payload2,

      gasLimit: 7000000,
      chainID: selectedNetwork.shortId,
    });

    transactions.push(tx);
  }

  return await sendMultipleTransactions({ txs: transactions });
};
