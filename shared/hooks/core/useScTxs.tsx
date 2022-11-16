/* eslint-disable react-hooks/exhaustive-deps */
import {
  Address,
  ContractCallPayloadBuilder,
  ContractFunction,
  TokenPayment,
  Transaction,
  TypedValue,
} from "@elrondnetwork/erdjs";
import { ApiNetworkProvider } from "@elrondnetwork/erdjs-network-providers";
import { useState } from "react";
import { useSnapshot } from "valtio";
import { chainType, networkConfig } from "../../../config/network";
import { accountState, loginInfoState } from "../../store/auth";
import { getNetworkState } from "../../store/network";
import { DappProvider } from "../../types/network";
import { sendTxOperations, TransactionCb } from "./common-helpers/sendTxsO";

export interface ScTransactionParams {
  smartContractAddress: string;
  func: ContractFunction;
  gasLimit: number;
  args: TypedValue[] | undefined;
  value: number | undefined;
}

interface SCTransactionArgs {
  cb?: (params: TransactionCb) => void;
  webWalletRedirectUrl?: string;
}

export function useScTransaction(
  { webWalletRedirectUrl, cb }: SCTransactionArgs = {
    webWalletRedirectUrl: undefined,
    cb: undefined,
  }
) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState<Transaction[] | null>([]);
  const accountSnap = useSnapshot(accountState);
  const loginInfoSnap = useSnapshot(loginInfoState);

  const dappProvider = getNetworkState<DappProvider>("dappProvider");
  const apiNetworkProvider =
    getNetworkState<ApiNetworkProvider>("apiNetworkProvider");
  const currentNonce = accountSnap.nonce;

  // useWebWalletTxSend({ setPending, setTransaction, setError, cb });

  const triggerTx = async (scParams: ScTransactionParams[]) => {
    setTransactions(null);
    setError("");
    if (
      dappProvider &&
      apiNetworkProvider &&
      currentNonce !== undefined &&
      !pending &&
      accountSnap.address
    ) {
      setPending(true);
      cb?.({ pending: true });
      const txs = scParams.map((sp) => {
        const { smartContractAddress, func, gasLimit, args, value } = sp;
        const data = new ContractCallPayloadBuilder()
          .setFunction(func)
          .setArgs(args || [])
          .build();

        const tx = new Transaction({
          data,
          gasLimit,
          ...(value ? { value: TokenPayment.egldFromAmount(value) } : {}),
          chainID: networkConfig[chainType].shortId,
          receiver: new Address(smartContractAddress),
          sender: new Address(accountSnap.address),
        });
        tx.setNonce(currentNonce);

        return tx;
      });

      sendTxOperations(
        dappProvider,
        txs,
        loginInfoSnap,
        apiNetworkProvider,
        setTransactions,
        setError,
        setPending,
        webWalletRedirectUrl,
        cb
      );
    } else {
      setError(
        "There is something wrong with the network synchronization. Check if you are logged in."
      );
    }
  };

  return {
    pending,
    triggerTx,
    transactions,
    error,
  };
}
