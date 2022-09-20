import { Center, Flex } from "@chakra-ui/react";
import { BytesValue } from "@elrondnetwork/erdjs/out";
import { useFormik } from "formik";
import * as yup from "yup";
import { ActionButton } from "../../../../components/tools/ActionButton";
import SelectDark, {
  OptionSelectDark,
} from "../../../../components/ui/SelectDark";
import { tokensPools } from "../../../../constants/tokens";
import { useScTransaction } from "../../../../hooks/core/useScTransaction";
import { NftStakingPoolsWsp } from "../../../../services/sc";
import { scCall } from "../../../../services/sc/calls";
import { formatTokenI } from "../../../../utils/formatTokenIdentifier";
import { TxCb } from "../../../../utils/txCallback";

const validationSchema = yup.object({
  token: yup.string().required(),
});

const WithdrawFee = () => {
  const { triggerTx } = useScTransaction({
    cb: TxCb,
  });
  const formik = useFormik({
    initialValues: {
      token: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values", values);
      triggerTx(
        scCall(NftStakingPoolsWsp, "withdrawFee", [
          BytesValue.fromUTF8(values.token),
        ])
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Center flexDir={"column"}>
        <Flex gap={4} mb={2}>
          <SelectDark onChange={formik.handleChange} name="token" minW="250px">
            <>
              <OptionSelectDark>Collection</OptionSelectDark>
              {tokensPools.map((t) => {
                if (!t) {
                  return null;
                }
                return (
                  <OptionSelectDark key={t.identifier} value={t.identifier}>
                    {formatTokenI(t.identifier)}
                  </OptionSelectDark>
                );
              })}
            </>
          </SelectDark>
        </Flex>
        <ActionButton type="submit">Withdraw fee</ActionButton>
      </Center>
    </form>
  );
};

export default WithdrawFee;
