import {
  Center,
  Flex,
  FlexProps,
  Icon,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

interface IProps extends InputProps {
  wrapperProps: FlexProps;
}
const SearchBar = ({ wrapperProps, ...props }: IProps) => {
  return (
    <Flex
      justifyContent={"space-between"}
      border="1px solid white"
      borderRadius={"xl"}
      {...wrapperProps}
    >
      <Input
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
