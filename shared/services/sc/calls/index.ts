import {
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
  ContractFunction,
} from "@elrondnetwork/erdjs/out";
import BigNumber from "bignumber.js";
import { getInterface } from "..";
import { selectedNetwork } from "../../../../config/network";
import { store } from "../../../../redux/store";
import { ScTransactionParams } from "../../../hooks/core/useScTransaction";

export const ESDTNFTTransfer = (
  funcName = "",
  userAddress = "",
  value = 0,
  token,
  contractAddr = "",
  gasLimit = 200000000,
  args = [],
  finalTokenValue = undefined
): ScTransactionParams => {
  const tokenId = token.collection;
  const tokenNonce = token.nonce;
  const finalValue =
    finalTokenValue ||
    Number(value) * Math.pow(10, Number(selectedNetwork.egldDenomination));

  const func = new ContractFunction("ESDTNFTTransfer");

  const argum = [
    BytesValue.fromUTF8(tokenId),
    new BigUIntValue(new BigNumber(tokenNonce)),
    new BigUIntValue(new BigNumber(finalValue)),
    new AddressValue(new Address(contractAddr)),
    BytesValue.fromUTF8(funcName),
    ...args,
  ];
  const sotredUserAddress = store.getState().settings.userAddress;
  const smartContractAddress = userAddress || sotredUserAddress;

  return {
    func,
    args: argum,
    smartContractAddress,
    gasLimit: gasLimit,
    value: 0,
  };
};

export const scCall = (
  workspace,
  funcName,
  args = [],
  gasLimit = 200000000,
  value = undefined
): ScTransactionParams => {
  const { simpleAddress } = getInterface(workspace);

  const func = new ContractFunction(funcName);

  const argum = [...args];

  const smartContractAddress = simpleAddress;

  return {
    func,
    args: argum,
    smartContractAddress,
    gasLimit: gasLimit,
    value: value,
  };
};
export const ESDTTransfer = (
  workspace,
  funcName,
  token: { identifier: string; decimals?: number },
  val = 0,
  args = [],
  gasLimit = 200000000,
  realValue?: string | number
): ScTransactionParams => {
  const tokenIdentifier = token.identifier;
  const multiplyier = Math.pow(10, token.decimals || 18);
  const finalValue = realValue || Number(val) * multiplyier;
  const { simpleAddress } = getInterface(workspace);

  const func = new ContractFunction("ESDTTransfer");

  const argum = [
    BytesValue.fromUTF8(tokenIdentifier),
    new BigUIntValue(new BigNumber(finalValue)),
    BytesValue.fromUTF8(funcName),
    ...args,
  ];

  const smartContractAddress = simpleAddress;

  return {
    func,
    args: argum,
    smartContractAddress,
    gasLimit: gasLimit,
    value: undefined,
  };
};
