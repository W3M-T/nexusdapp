// Tools used internally by sent transactions hooks
import { Account, Transaction, TransactionWatcher } from "@elrondnetwork/erdjs";
import { ExtensionProvider } from "@elrondnetwork/erdjs-extension-provider";
import { HWProvider } from "@elrondnetwork/erdjs-hw-provider";
import { ApiNetworkProvider } from "@elrondnetwork/erdjs-network-providers";
import { WalletConnectProvider } from "@elrondnetwork/erdjs-wallet-connect-provider";
import { WalletProvider } from "@elrondnetwork/erdjs-web-wallet-provider";
import { Dispatch, SetStateAction } from "react";
import { LoginInfoState, setAccountState } from "../../../store/auth";
import { LoginMethodsEnum } from "../../../types/enums";
import { DappProvider } from "../../../types/network";
import { errorParse } from "../../../utils/errorParse";

export interface TransactionCb {
  transaction?: Transaction[] | null;
  error?: string;
  pending?: boolean;
}

export const postSendTxOperations = async (
  txs: Transaction[],
  setTransactions: Dispatch<SetStateAction<Transaction[]>>,
  apiNetworkProvider: ApiNetworkProvider,
  cb?: (params: TransactionCb) => void
) => {
  const transactionWatcher = new TransactionWatcher(apiNetworkProvider);

  await Promise.all(
    txs.map((tx) => {
      return transactionWatcher.awaitCompleted(tx);
    })
  );
  setTransactions(txs);
  cb?.({ transaction: txs, pending: false });
  const sender = txs[0].getSender();
  const senderAccount = new Account(sender);
  const userAccountOnNetwork = await apiNetworkProvider.getAccount(sender);
  senderAccount.update(userAccountOnNetwork);
  setAccountState("address", senderAccount.address.bech32());
  setAccountState("nonce", senderAccount.getNonceThenIncrement());
  setAccountState("balance", senderAccount.balance.toString());
};

export const sendTxOperations = async (
  dappProvider: DappProvider,
  txs: Transaction[],
  loginInfoSnap: LoginInfoState,
  apiNetworkProvider: ApiNetworkProvider,
  setTransactions: Dispatch<SetStateAction<Transaction[]>>,
  setError: Dispatch<SetStateAction<string>>,
  setPending: Dispatch<SetStateAction<boolean>>,
  webWalletRedirectUrl?: string,
  cb?: (params: TransactionCb) => void
) => {
  try {
    if (dappProvider instanceof WalletProvider) {
      const currentUrl = window?.location.href;
      await dappProvider.signTransactions(txs, {
        callbackUrl: webWalletRedirectUrl || currentUrl,
      });
    }
    if (dappProvider instanceof ExtensionProvider) {
      await dappProvider.signTransactions(txs);
    }
    if (dappProvider instanceof WalletConnectProvider) {
      await dappProvider.signTransactions(txs);
    }
    if (dappProvider instanceof HWProvider) {
      await dappProvider.signTransactions(txs);
    }
    if (loginInfoSnap.loginMethod !== LoginMethodsEnum.wallet) {
      await Promise.all(
        txs.map((tx) => {
          return apiNetworkProvider.sendTransaction(tx);
        })
      );

      await postSendTxOperations(txs, setTransactions, apiNetworkProvider, cb);
    }
  } catch (e) {
    const err = errorParse(e);
    setError(err);
    cb?.({ error: err });
  } finally {
    setPending(false);
    cb?.({ pending: false });
  }
};
