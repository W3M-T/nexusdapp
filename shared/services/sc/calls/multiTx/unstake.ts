import {
  Account,
  Address,
  BigUIntValue,
  BytesValue,
  ContractFunction,
  Interaction,
  SmartContract,
  Transaction,
  TransactionPayload,
} from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import { sendMultipleTransactions } from "..";
import { selectedNetwork } from "../../../../../config/network";
import { store } from "../../../../redux/store";

export const unstakeNfts = async (nfts: { token: string; nonce: number }[]) => {
  const transactions: Transaction[] = [];

  nfts.forEach((nft) => {
    const sender = store.getState().settings.userAddress;
    const senderAddress = new Address(sender);
    const receiverAddress = new Address(
      selectedNetwork.contractAddr.nftsStaking
    );

    const contract = new SmartContract({ address: new Address(receiverAddress)});
    let interaction = new Interaction(contract, new ContractFunction("unstakeNft"),
      [
        BytesValue.fromUTF8(nft.token),
        new BigUIntValue(new BigNumber(nft.nonce)),
      ]
    );
  
    let tx = interaction
      .withSender(senderAddress)
      .useThenIncrementNonceOf(new Account(senderAddress))
      .withGasLimit(70000000)
      .withValue(0.00075 * Math.pow(10, 18))
      .withChainID(selectedNetwork.shortId)
      .buildTransaction();

    transactions.push(tx);
  });

  return await sendMultipleTransactions({ txs: transactions });
};
