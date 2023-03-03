import { BigUIntValue, BytesValue } from "@multiversx/sdk-core/out";
import { useCallback } from "react";
import { scCall } from "../../../../shared/services/sc/calls";
import { formatErdAmount } from "../../../../shared/utils/erdAmount";
import { getTokenDetails } from "../../../../shared/utils/getTokenDetails";
import GeneralAction from "../GeneralAction/GeneralAction";

const SetOneTimeFee = () => {
  const handleSetFee = useCallback(
    async (values: { token: string; amount: string }) => {
      let decimals;
      if (values.token !== "EGLD") {
        const tokenD = await getTokenDetails(values.token);
        decimals = tokenD?.decimals;
      }

      scCall("NftStakingPoolsWsp", "setOneTimeFee", [
        BytesValue.fromUTF8(values.token),
        new BigUIntValue(formatErdAmount(values.amount, decimals)),
      ]);
    },
    []
  );
  return (
    <GeneralAction
      onSubmit={handleSetFee}
      // disabled={pending}
      actionText="Set One Time Fee"
    />
  );
};

export default SetOneTimeFee;
