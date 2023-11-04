import {
  Center,
  Flex,
  FlexProps,
  Icon,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { customColors } from "../../../config/chakraTheme";

interface IProps extends InputProps {
  wrapperProps: FlexProps;
}
const SearchBar = ({ wrapperProps, ...props }: IProps) => {
  return (
    <Flex
      justifyContent={"space-between"}
      borderRadius={"2xl"}
      backgroundColor={customColors.myCustomColor.base}
      {...wrapperProps}
    >
      <Input
        borderRadius={"2xl"}
        border="none"
        _focus={{
          border: "none",
          outline: "none",
          boxShadow: "none",
        }}
        pr={0}
        {...props}
      />
      <Center px={3}>
        <Icon as={BsSearch} />
      </Center>
    </Flex>
  );
};

export default SearchBar;
