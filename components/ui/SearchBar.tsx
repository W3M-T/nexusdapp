import { Center, Flex, FlexProps, Icon, Input } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

interface IProps extends FlexProps {}

const SearchBar = ({ ...props }: IProps) => {
  return (
    <Flex
      justifyContent={"space-between"}
      border="1px solid white"
      borderRadius={"xl"}
      {...props}
    >
      <Input
        border="none"
        _focus={{
          border: "none",
          outline: "none",
          boxShadow: "none",
        }}
        pr={0}
      />
      <Center px={3}>
        <Icon as={BsSearch} />
      </Center>
    </Flex>
  );
};

export default SearchBar;
