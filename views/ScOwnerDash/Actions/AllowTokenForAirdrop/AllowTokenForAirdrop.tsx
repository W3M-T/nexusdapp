import { Center, Flex, Input } from "@chakra-ui/react";
import { BytesValue } from "@elrondnetwork/erdjs/out";
import { useFormik } from "formik";
import * as yup from "yup";
import { ActionButton } from "../../../../shared/components/tools/ActionButton";
import { scCall } from "../../../../shared/services/sc/calls";

const validationSchema = yup.object({
  token: yup.string().required(),
});

const AllowTokenForAirdrop = () => {
  const formik = useFormik({
    initialValues: {
      token: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      scCall("NftStakingPoolsWsp", "allowTokenAsReward", [
        BytesValue.fromUTF8(values.token),
      ]);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Center flexDir={"column"}>
        <Flex gap={4} mb={6}>
          <Input
            name="token"
            placeholder="token"
            onChange={formik.handleChange}
            isInvalid={formik.touched.token && Boolean(formik.errors.token)}
          />
        </Flex>
        <ActionButton type="submit">Allow Token for Airdrop</ActionButton>
      </Center>
    </form>
  );
};

export default AllowTokenForAirdrop;
