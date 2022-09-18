import {
  BigIntValue,
  BytesValue,
  ContractFunction,
} from "@elrondnetwork/erdjs/out";
import BigNumber from "bignumber.js";
import { useCallback } from "react";
import { useScTransaction } from "../../../../hooks/core/useScTransaction";
import { TxCb } from "../../../../utils/txCallback";
import GeneralAction from "../GeneralAction/GeneralAction";

const SetOneTimeFee = () => {
  const { pending, triggerTx, transaction, error } = useScTransaction({
    cb: TxCb,
  });

  const handleSetFee = useCallback(
    (amount, token) => {
      triggerTx({
        smartContractAddress:
          "erd1qqqqqqqqqqqqqpgqupsnyns7ck54q6ue23d9d2nzz5r9wz9q8pgqa7a57l",
        func: new ContractFunction("setOneTimeFee"),
        gasLimit: 70000000,
        args: [
          BytesValue.fromUTF8(token),
          new BigIntValue(new BigNumber(amount)),
        ],
        value: undefined,
      });
    },
    [triggerTx]
  );
  return (
    <GeneralAction
      onSubmit={handleSetFee}
      disabled={pending}
      actionText="Set One Time Fee"
    />
  );
};

export default SetOneTimeFee;
