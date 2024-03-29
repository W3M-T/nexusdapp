import { Center, Flex } from "@chakra-ui/react";
import { BytesValue } from "@multiversx/sdk-core/out";
import { useFormik } from "formik";
import * as yup from "yup";
import { ActionButton } from "../../../../shared/components/tools/ActionButton";
import SelectDark, {
  OptionSelectDark,
} from "../../../../shared/components/ui/SelectDark";
import { useAppSelector } from "../../../../shared/hooks/core/useRedux";
import { selectNonWithdrawnCollections } from "../../../../shared/redux/slices/pools";
import { scCall } from "../../../../shared/services/sc/calls";
import { formatTokenI } from "../../../../shared/utils/formatTokenIdentifier";

const validationSchema = yup.object({
  token: yup.string().required(),
});

const WithdrawFee = () => {
  const collections = useAppSelector(selectNonWithdrawnCollections);

  const formik = useFormik({
    initialValues: {
      token: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      scCall("NftStakingPoolsWsp", "withdrawFee", [
        BytesValue.fromUTF8(values.token),
      ]);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Center flexDir={"column"}>
        <Flex gap={4} mb={2}>
          <SelectDark onChange={formik.handleChange} name="token" minW="250px">
            <>
              <OptionSelectDark value={""}>Collection</OptionSelectDark>
              {collections.data.map((t) => {
                if (!t) {
                  return null;
                }
                return (
                  <OptionSelectDark key={t} value={t}>
                    {formatTokenI(t)}
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
