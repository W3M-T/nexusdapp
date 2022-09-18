import { BigUIntValue, BytesValue } from "@elrondnetwork/erdjs/out";
import BigNumber from "bignumber.js";
import { useCallback } from "react";
import { useScTransaction } from "../../../../hooks/core/useScTransaction";
import { NftStakingPoolsWsp } from "../../../../services/sc";
import { scCall } from "../../../../services/sc/calls";
import { TxCb } from "../../../../utils/txCallback";
import GeneralAction from "../GeneralAction/GeneralAction";

const SetOneTimeFee = () => {
  const { pending, triggerTx, transaction, error } = useScTransaction({
    cb: TxCb,
  });

  const handleSetFee = useCallback(
    (amount, token) => {
      triggerTx(
        scCall(NftStakingPoolsWsp, "setOneTimeFee", [
          BytesValue.fromUTF8(token),
          new BigUIntValue(new BigNumber(amount)),
        ])
      );
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
