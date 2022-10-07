import { Center, Flex, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { ActionButton } from "../../../../shared/components/tools/ActionButton";
import SelectDark, {
  OptionSelectDark,
} from "../../../../shared/components/ui/SelectDark";
import { useAppSelector } from "../../../../shared/hooks/core/useRedux";
import { selectRegistrationTokens } from "../../../../shared/redux/slices/pools";
import { formatTokenI } from "../../../../shared/utils/formatTokenIdentifier";
interface IProps {
  onSubmit: (values) => void;
  actionText: string;
  disabled?: boolean;
}

const validationSchema = yup.object({
  amount: yup.number().required(),
  token: yup.string().required(),
});

const GeneralAction = ({ onSubmit, disabled, actionText }: IProps) => {
  const { data: tokensPools } = useAppSelector(selectRegistrationTokens);
  const formik = useFormik({
    initialValues: {
      amount: "",
      token: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Center flexDir={"column"}>
        <Flex gap={4} mb={2}>
          <Input
            name="amount"
            placeholder="Amount"
            onChange={formik.handleChange}
            isInvalid={formik.touched.amount && Boolean(formik.errors.amount)}
          />
          <SelectDark onChange={formik.handleChange} name="token">
            <>
              <OptionSelectDark>Token</OptionSelectDark>
              {tokensPools.map((t) => {
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
        <ActionButton type="submit" disabled={disabled}>
          {actionText}
        </ActionButton>
      </Center>
    </form>
  );
};

export default GeneralAction;
