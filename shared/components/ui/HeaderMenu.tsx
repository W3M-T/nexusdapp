import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Logo } from "./Logo";

export const HeaderMenu = ({ children }: PropsWithChildren) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={"space-between"}
      gap="4"
      pt={4}
      flexDirection={"row"}
      textAlign={"center"}
    >
      <Logo />
      {children}
    </Box>
  );
};
