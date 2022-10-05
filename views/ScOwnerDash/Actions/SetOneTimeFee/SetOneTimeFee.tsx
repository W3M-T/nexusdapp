import { BigUIntValue, BytesValue } from "@elrondnetwork/erdjs/out";
import { useCallback } from "react";
import { useScTransaction } from "../../../../shared/hooks/core/useScTransaction";
import { NftStakingPoolsWsp } from "../../../../shared/services/sc";
import { scCall } from "../../../../shared/services/sc/calls";
import { formatErdAmount } from "../../../../shared/utils/erdAmount";
import { getTokenDetails } from "../../../../shared/utils/getTokenDetails";
import { TxCb } from "../../../../shared/utils/txCallback";
import GeneralAction from "../GeneralAction/GeneralAction";

const SetOneTimeFee = () => {
  const { pending, triggerTx } = useScTransaction({
    cb: TxCb,
  });

  const handleSetFee = useCallback(
    async (values: { token: string; amount: string }) => {
      let decimals;
      if (values.token !== "EGLD") {
        const tokenD = await getTokenDetails(values.token);
        decimals = tokenD?.decimals;
      }
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
