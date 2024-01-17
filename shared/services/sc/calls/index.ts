import { sendTransactions } from "@multiversx/sdk-dapp/services";
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
} from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import { getInterface, WORKSPACES } from "..";
import { selectedNetwork } from "../../../../config/network";
import { store } from "../../../redux/store";

let ChainId = selectedNetwork.shortId;

/* Queries */
// export const provider = new ProxyNetworkProvider(network.gatewayAddress, {
//   timeout: 30000,
// });

// export const abiPath = "/api";

/* Messages */
const defaultProcessingMessage = "Processing transaction";
const defaultPerrorMessage = "An error has occured";
const defaultSuccessMessage = "Transaction successful";
const defaulttransactionDuration = 1000 * 60 * 2;

export const EGLD_VAL = 1000000000000000000;

/* Calls */
export const sendTransaction = async ({
  tx,
  processingMessage = null,
  errorMessage = null,
  successMessage = null,
  transactionDuration = null,
}: {
  tx: any;
  processingMessage?: string;
  errorMessage?: string;
  successMessage?: string;
  transactionDuration?: number;
}) => {

  const res = await sendTransactions({
    transactions: [tx],
    transactionsDisplayInfo: {
      processingMessage: processingMessage || defaultProcessingMessage,
      errorMessage: errorMessage || defaultPerrorMessage,
      successMessage: successMessage || defaultSuccessMessage,
      transactionDuration: transactionDuration || 60000,
    },
  });

  return res;
};

export const sendMultipleTransactions = async ({
  txs,
  processingMessage,
  errorMessage,
  successMessage,
  transactionDuration,
}: {
  txs: any;
  processingMessage?: string;
  errorMessage?: string;
  successMessage?: string;
  transactionDuration?: number;
}) => {
  const res = await sendTransactions({
    transactions: txs,
    transactionsDisplayInfo: {
      processingMessage: processingMessage || defaultProcessingMessage,
      errorMessage: errorMessage || defaultPerrorMessage,
      successMessage: successMessage || defaultSuccessMessage,
      transactionDuration: transactionDuration || defaulttransactionDuration,
    },
  });

  return res;
};

export const ESDTNFTTransfer = async (
  funcName = "",
  userAddress = "",
  value = 0,
  token,
  contractAddr = "",
  gasL: number = 60000000,
  args = [],
  finalTokenValue?: number | string
) => {
  try {
    const tokenId = token.collection;
    const tokenNonce = token.nonce;
    const finalValue = Number(finalTokenValue) || Number(value) * Math.pow(10, 18);
  
    const sender = store.getState().settings.userAddress;
    const senderAddress = new Address(sender);
    const receiverAddress = new Address(sender);
  
    const contract = new SmartContract({ address: new Address(contractAddr)});
    let interaction = new Interaction(contract, new ContractFunction(funcName), args);
  
    let tx = interaction
      .withSender(senderAddress)
      .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
      .withSingleESDTNFTTransfer(TokenTransfer.semiFungible(tokenId, tokenNonce, finalValue))
      .withExplicitReceiver(senderAddress)
      .withGasLimit(gasL)
      .withChainID(ChainId)
      .buildTransaction();
  
    let transactionInput = { tx: tx };
  
    return await sendTransaction(transactionInput);
  } catch (error) {
    console.log("error", error);
  }
};


export const ESDTTransfer = async ({
  funcName,
  token,
  val = 0,
  contractAddr = "",
  args = [],
  gasL = 60000000,
  realValue = null,
}: {
  funcName: string;
  token: any;
  val?: number | string;
  contractAddr: string;
  args?: any[];
  gasL?: number;
  realValue?: string | number | null;
}) => {
  const tokenIdentifier = token.identifier;
  const multiplyier = Math.pow(10, token.decimals || 18);
  const finalValue = realValue || Number(val || 0) * multiplyier;
  const bgFinalValue = new BigNumber(finalValue).toFixed(0);

  const receiverAddress = new Address(contractAddr);

  const sender = store.getState().settings.userAddress;
  const senderAddress = new Address(sender);

  const contract = new SmartContract({ address: receiverAddress});
  let interaction = new Interaction(contract, new ContractFunction(funcName), args);

  let tx = interaction
    .withSender(senderAddress)
    .useThenIncrementNonceOf(new Account(senderAddress))
    .withSingleESDTTransfer(TokenTransfer.fungibleFromBigInteger(tokenIdentifier, bgFinalValue, token.decimals))
    .withGasLimit(gasL)
    .withChainID(ChainId)
    .buildTransaction();

  let transactionInput = { tx: tx };

  return await sendTransaction(transactionInput);
};

export const scCall = async (
  workspace: WORKSPACES,
  funcName: string,
  args: any = [],
  gasLimit: number = 80000000,
  processingMessage: string = defaultProcessingMessage,
  successMessage: string = defaultSuccessMessage,
  errorMessage: string = defaultPerrorMessage,
  transactionDuration: number = defaulttransactionDuration
) => {
  let { simpleAddress } = getInterface(workspace);

  if (simpleAddress === "") {
    simpleAddress = workspace;
  }

  const sender = store.getState().settings.userAddress;
  const senderAddress = new Address(sender);

  const contract = new SmartContract({ address: new Address(simpleAddress)});
  let interaction = new Interaction(contract, new ContractFunction(funcName), args);

  let tx = interaction
    .withSender(senderAddress)
    .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
    .withGasLimit(gasLimit)
    .withChainID(ChainId)
    .buildTransaction();

  let transactionInput = {
    tx: tx,
    processingMessage: processingMessage,
    successMessage: successMessage,
    errorMessage: errorMessage,
    transactionDuration: transactionDuration,
  };

  return await sendTransaction(transactionInput);
};

export const EGLDPayment = async (
  workspace: WORKSPACES,
  funcName,
  amount,
  args = [],
  gasLimit: number = 60000000,
  finalAmount = null
) => {
  let { simpleAddress } = getInterface(workspace);

  if (simpleAddress === "") {
    simpleAddress = workspace;
  }
  const sender = store.getState().settings.userAddress;
  const senderAddress = new Address(sender);

  const contract = new SmartContract({ address: new Address(simpleAddress)});
  let interaction = new Interaction(contract, new ContractFunction(funcName), args);

  let tx = interaction
    .withSender(senderAddress)
    .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
    .withValue(finalAmount ?? amount * EGLD_VAL)
    .withGasLimit(gasLimit)
    .withChainID(ChainId)
    .buildTransaction();

  let transactionInput = { tx: tx };

  return await sendTransaction(transactionInput);
};
