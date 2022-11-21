import {
  refreshAccount,
  sendTransactions,
  transactionServices,
} from "@elrondnetwork/dapp-core";
import {
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
  ContractFunction,
  Transaction,
  TransactionPayload,
} from "@elrondnetwork/erdjs/out";
import BigNumber from "bignumber.js";
import { getInterface, WORKSPACES } from "..";
import { selectedNetwork } from "../../../../config/network";
import { store } from "../../../redux/store";

export const sendTransaction = async ({
  addr,
  payload,
  processingMessage,
  errorMessage,
  successMessage,
  transactionDuration,
  value,
  gasL,
}) => {
  const sender = store.getState().settings.userAddress;
  const receiverAddress = new Address(addr);
  const senderAddress = new Address(sender);

  const tx = new Transaction({
    sender: senderAddress,
    value: value || 0,
    receiver: receiverAddress,
    data: payload,
    gasLimit: gasL || 50000000,
    chainID: selectedNetwork.shortId,
  });

  await refreshAccount();

  const res = await sendTransactions({
    transactions: tx,
    transactionsDisplayInfo: {
      processingMessage: processingMessage,
      errorMessage: errorMessage,
      successMessage: successMessage,
      transactionDuration: transactionDuration,
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
  txs: Transaction[];
  processingMessage?: any;
  errorMessage?: any;
  successMessage?: any;
  transactionDuration?: any;
}) => {
  await refreshAccount();

  const { sendTransactions } = transactionServices;

  const res = await sendTransactions({
    transactions: txs,
    transactionsDisplayInfo: {
      processingMessage: processingMessage,
      errorMessage: errorMessage,
      successMessage: successMessage,
      transactionDuration: transactionDuration,
    },
  });

  return res;
};

export const ESDTNFTTransfer = async (
  workspace: WORKSPACES,
  funcName = "",
  value = 0,
  token: {
    collection: string;
    nonce: number;
  },
  args = [],
  gasL = 200000000,
  finalTokenValue?: number
) => {
  const { simpleAddress: contractAddr } = getInterface(workspace);

  try {
    const tokenId = token.collection;
    const tokenNonce = token.nonce;
    const finalValue = finalTokenValue || Number(value) * Math.pow(10, 18);
    console.log("finalValue", finalValue);

    const payload = TransactionPayload.contractCall()
      .setFunction(new ContractFunction("ESDTNFTTransfer"))
      .setArgs([
        BytesValue.fromUTF8(tokenId),
        new BigUIntValue(new BigNumber(tokenNonce)),
        new BigUIntValue(new BigNumber(finalValue)),
        new AddressValue(new Address(contractAddr)),
        BytesValue.fromUTF8(funcName),
        ...args,
      ])
      .build();
    const userAddress = store.getState().settings.userAddress;
    const transactionData: any = {
      addr: userAddress,
      payload: payload,
      gasL: gasL,
    };

    return await sendTransaction(transactionData);
  } catch (error) {
    console.log("error", error);
  }
};
export const ESDTTransfer = async ({
  funcName,
  token,
  val = 0,
  contractAddr,
  args = [],
  gasL = 200000000,
  realValue,
}: {
  funcName: string;
  token: {
    identifier: string;
    decimals: number;
  };
  val: number;
  contractAddr: string;
  args: any[];
  gasL?: number;
  realValue?: number;
}) => {
  const tokenIdentifier = token.identifier;
  const multiplyier = Math.pow(10, token.decimals || 18);
  const finalValue = realValue || Number(val) * multiplyier;
  const payload = TransactionPayload.contractCall()
    .setFunction(new ContractFunction("ESDTTransfer"))
    .setArgs([
      BytesValue.fromUTF8(tokenIdentifier),
      new BigUIntValue(new BigNumber(finalValue)),
      BytesValue.fromUTF8(funcName),
      ...args,
    ])
    .build();

  const transactionData: any = {
    addr: contractAddr,
    payload: payload,
    gasL: gasL,
  };
  return await sendTransaction(transactionData);
};

export const scCall = async (
  workspace: WORKSPACES,
  funcName: string,
  args: any[] = [],
  gasLimit?: number
) => {
  let { simpleAddress } = getInterface(workspace);

  if (simpleAddress === "") {
    simpleAddress = workspace;
  }

  const payload = TransactionPayload.contractCall()
    .setFunction(new ContractFunction(funcName))
    .setArgs(args)
    .build();
  const transactionData: any = {
    addr: simpleAddress,
    payload: payload,
    gasL: gasLimit || 200000000,
  };
  return await sendTransaction(transactionData);
};

export const EGLDPayment = async (
  workspace: WORKSPACES,
  funcName: string,
  amount: number,
  args: any[] = [],
  gasLimit?: number
) => {
  let { simpleAddress } = getInterface(workspace);

  if (simpleAddress === "") {
    simpleAddress = workspace;
  }

  const payload = TransactionPayload.contractCall()
    .setFunction(new ContractFunction(funcName))
    .setArgs(args)
    .build();
  const transactionData: any = {
    addr: simpleAddress,
    payload: payload,
    value: amount * Math.pow(10, 18),
    gasL: gasLimit || 200000000,
  };

  return await sendTransaction(transactionData);
};
