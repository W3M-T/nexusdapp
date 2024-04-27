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
import { sendMultipleTransactions, sendTransaction } from ".";
import { egldFee, selectedNetwork } from "../../../../config/network";
import { store } from "../../../redux/store";

export const buyListedNft = async (id: number, price: number) => {
  const sender = store.getState().settings.userAddress;
  const senderAddress = new Address(sender);
  
  const receiverAddress = new Address(selectedNetwork.contractAddr.nftMarketplace);

  const contract = new SmartContract({ address: new Address(receiverAddress)});
  let interaction = new Interaction(contract, new ContractFunction("buy"), [new BigUIntValue(new BigNumber(id))]);

  let tx = interaction
    .withSender(senderAddress)
    .useThenIncrementNonceOf(new Account(senderAddress))
    .withGasLimit(30000000)
    .withValue(price)
    .withChainID(selectedNetwork.shortId)
    .buildTransaction();

  return await sendTransaction({tx: tx});
};
