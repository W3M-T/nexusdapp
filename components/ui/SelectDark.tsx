import { Box, BoxProps, Select, SelectProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const SelectDark = ({ children, ...props }: PropsWithChildren<SelectProps>) => {
  return (
    <Select
      variant="filled"
      bg="#0F1535"
      mb={4}
      _focus={{
        bg: "#0F1535",
      }}
      _hover={{
        bg: "#0F1535",
      }}
      cursor="pointer"
      {...props}
    >
      {children}
    </Select>
  );
};

export default SelectDark;

export const OptionSelectDark = ({
  children,
  ...props
}: PropsWithChildren<BoxProps>) => {
  return (
    <Box as="option" bg="#252943 !important" {...props}>
      {children}
    </Box>
  );
};
