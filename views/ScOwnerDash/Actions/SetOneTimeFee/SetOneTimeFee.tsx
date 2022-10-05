import { BigUIntValue, BytesValue } from "@elrondnetwork/erdjs/out";
import { useCallback } from "react";
import { selectedNetwork } from "../../../../config/network";
import { useScTransaction } from "../../../../shared/hooks/core/useScTransaction";
import { NftStakingPoolsWsp } from "../../../../shared/services/sc";
import { scCall } from "../../../../shared/services/sc/calls";
import { formatErdAmount } from "../../../../shared/utils/erdAmount";
import { formatTokenI } from "../../../../shared/utils/formatTokenIdentifier";
import { TxCb } from "../../../../shared/utils/txCallback";
import GeneralAction from "../GeneralAction/GeneralAction";

const SetOneTimeFee = () => {
  const { pending, triggerTx } = useScTransaction({
    cb: TxCb,
  });

  const handleSetFee = useCallback(
    (values: { token: string; amount: string }) => {
      const decimals =
        selectedNetwork.tokens[formatTokenI(values.token)].decimals;

      triggerTx(
        scCall(NftStakingPoolsWsp, "setOneTimeFee", [
          BytesValue.fromUTF8(values.token),
          new BigUIntValue(formatErdAmount(values.amount, decimals)),
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
