import { Center, Flex, Input } from "@chakra-ui/react";
import { ActionButton } from "../../../../components/tools/ActionButton";
import SelectDark, {
  OptionSelectDark,
} from "../../../../components/ui/SelectDark";

interface IProps {
  onSubmit: (amount: string, token: string) => void;
  actionText: string;
}
const GeneralAction = ({ onSubmit, actionText }: IProps) => {
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
      <ActionButton onClick={() => onSubmit("451", "EGLD")}>
        {actionText}
      </ActionButton>
    </Center>
  );
};

export default GeneralAction;
