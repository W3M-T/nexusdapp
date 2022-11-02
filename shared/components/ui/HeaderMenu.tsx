import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Logo } from "./Logo";

export const HeaderMenu = ({ children }: PropsWithChildren) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={{ sm: "center", xl: "space-between" }}
      gap="2"
      py={9}
      flexDirection={{ sm: "column", xl: "row" }}
      textAlign={"center"}
    >
      <Logo />
      {children}
    </Box>
  );
};
