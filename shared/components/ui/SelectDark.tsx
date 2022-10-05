import { Select, SelectProps } from "@chakra-ui/react";
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
  value,
  ...props
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
PropsWithChildren<any>) => {
  return (
    <option style={{ background: "#252943" }} value={value} {...props}>
      {children}
    </option>
  );
};
