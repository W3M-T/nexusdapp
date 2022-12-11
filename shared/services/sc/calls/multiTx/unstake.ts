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

export const unstakeNfts = async (nfts: { token: string; nonce: number }[]) => {
  const transactions: Transaction[] = [];

  nfts.forEach((nft) => {
    const payload = TransactionPayload.contractCall()
      .setFunction(new ContractFunction("unstakeNft"))
      .setArgs([
        BytesValue.fromUTF8(nft.token),
        new BigUIntValue(new BigNumber(nft.nonce)),
      ])
      .build();

    const sender = store.getState().settings.userAddress;
    const receiverAddress = new Address(
      selectedNetwork.contractAddr.nftsStaking
    );
    const senderAddress = new Address(sender);

    const tx = new Transaction({
      sender: senderAddress,
      value: 0.00075 * Math.pow(10, 18),
      receiver: receiverAddress,
      data: payload,
      gasLimit: 70000000,
      chainID: selectedNetwork.shortId,
    });
    transactions.push(tx);
  });

  return await sendMultipleTransactions({ txs: transactions });
};
