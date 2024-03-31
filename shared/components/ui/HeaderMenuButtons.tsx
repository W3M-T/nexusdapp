import { Box } from "@chakra-ui/react";
import { LoginModalButton } from "../tools/LoginModalButton";
import NavMenu from "./NavMenu";

interface HeaderMenuButtonsProps {
  enabled: string[];
}

export const HeaderMenuButtons = ({ enabled }: HeaderMenuButtonsProps) => {
  return (
    <Box
      display="flex"
      gap={1}
      alignItems="center"
      flexDirection={{ sm: "column", lg: "row" }}
      width={{ sm: "100%", lg: "auto" }}
      justifyContent={"space-between"}
    >
      <NavMenu />
      {enabled.includes("auth") && <LoginModalButton />}
    </Box>
  );
};
