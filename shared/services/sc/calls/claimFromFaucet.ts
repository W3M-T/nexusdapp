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
import { sendMultipleTransactions, sendTransaction } from ".";
import { egldFee, selectedNetwork } from "../../../../config/network";
import { store } from "../../../redux/store";

export const claimFromFaucet = async (token: string) => {
  const sender = store.getState().settings.userAddress;
  const senderAddress = new Address(sender);
  
  const receiverAddress = new Address(selectedNetwork.contractAddr[selectedNetwork.tokens[token].faucet]);

  const contract = new SmartContract({ address: new Address(receiverAddress)});
  let interaction = new Interaction(contract, new ContractFunction("claim"), []);

  let tx = interaction
    .withSender(senderAddress)
    .useThenIncrementNonceOf(new Account(senderAddress))
    .withGasLimit(70000000)
    .withValue(egldFee * Math.pow(10, 18))
    .withChainID(selectedNetwork.shortId)
    .buildTransaction();

  return await sendTransaction({tx: tx});
};
