import { TransactionCb } from "../hooks/core/common-helpers/sendTxOperations";
import {
  handleTxError,
  handleTxPending,
  handleTxTransaction,
} from "../redux/slices/transactions";
import { store } from "../redux/store";
import axiosEldron from "../services/rest/axiosEldron";
export const TxCb = async ({ transaction, pending, error }: TransactionCb) => {
  if (transaction) {
    const status = await isSmartContractSuccess(transaction.getHash().hex());

    store.dispatch(
      handleTxTransaction({
        type: "tx",
        content: transaction.getHash().hex(),
        status: status,
      })
    );
  }
  if (pending) {
    store.dispatch(handleTxPending());
  }
  if (error) {
    store.dispatch(handleTxError(error));
  }
};

export const isSmartContractSuccess = async (hash) => {
  if (!hash || hash === "") {
    return false;
  }

  const resTx = await axiosEldron(`transactions/${hash}`);

  if (resTx.data.status !== "fail") {
    return true;
  }
  return false;
};
