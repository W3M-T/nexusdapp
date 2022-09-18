import { Center, Flex, Input } from "@chakra-ui/react";
import { ActionButton } from "../../../../components/tools/ActionButton";
import SelectDark, {
  OptionSelectDark,
} from "../../../../components/ui/SelectDark";

interface IProps {
  onSubmit: (amount: string, token: string) => void;
  actionText: string;
  disabled?: boolean;
}
const GeneralAction = ({ onSubmit, disabled, actionText }: IProps) => {
  return (
    <Center flexDir={"column"}>
      <Flex gap={4} mb={2}>
        <Input placeholder="Amount" />
        <SelectDark>
          <OptionSelectDark>Token</OptionSelectDark>
          <OptionSelectDark>EGLD</OptionSelectDark>
          <OptionSelectDark>Mermaid</OptionSelectDark>
        </SelectDark>
      </Flex>
      <ActionButton
        onClick={() => onSubmit("10000000000000000", "EGLD")}
        disabled={disabled}
      >
        {actionText}
      </ActionButton>
    </Center>
  );
};

export default GeneralAction;
