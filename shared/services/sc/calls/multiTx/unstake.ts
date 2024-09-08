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
import { egldFee, selectedNetwork } from "../../../../../config/network";
import { store } from "../../../../redux/store";

const al3sandr0 = "erd1wn72ttl64axn6q59a5tegtqyk8yk6f3wj23th0p7nxw85ge6au0smxh4we";
const paul89 = "erd1hrpzwh56tdszq0x7h8ysvld9hpkfarczp4pyydu5ghrnuvx8nfes9ehsz9";
const eminescu = "erd1jjdxvk4kn3qrh5vvhyaaz5050d0zunufeu8ryt23j0ysf2renvgspmm5qz";
export const extraGasUsers = [al3sandr0, paul89, eminescu];

export const unstakeNfts = async (nfts: { token: string; nonce: number }[]) => {
  const transactions: Transaction[] = [];

  const gasLimit = 120000000;

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
      .withGasLimit(extraGasUsers.includes(sender) ? 2*gasLimit : gasLimit)
      // .withValue(egldFee * Math.pow(10, 18))
      .withChainID(selectedNetwork.shortId)
      .buildTransaction();

    transactions.push(tx);
  });

  return await sendMultipleTransactions({ txs: transactions });
};
