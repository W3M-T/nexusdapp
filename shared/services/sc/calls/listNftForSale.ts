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

export const listNftForSale = async (nft_token: string, nft_nonce: number, price: number) => {
  const sender = store.getState().settings.userAddress;
  const senderAddress = new Address(sender);
  
  const receiverAddress = new Address(selectedNetwork.contractAddr.nftMarketplace);

  const contract = new SmartContract({ address: new Address(receiverAddress)});
  let interaction = new Interaction(contract, new ContractFunction("list"), [new BigUIntValue(new BigNumber(price))]);

  let tx = interaction
    .withSender(senderAddress)
    .useThenIncrementNonceOf(new Account(senderAddress))
    .withGasLimit(30000000)
    .withValue(0)
    .withSingleESDTNFTTransfer(TokenTransfer.nonFungible(nft_token, nft_nonce))
    .withChainID(selectedNetwork.shortId)
    .buildTransaction();

  return await sendTransaction({tx: tx});
};
