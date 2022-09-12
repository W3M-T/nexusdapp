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
      gap={5}
      alignItems="center"
      flexDirection={["column", "column", "column", "row"]}
    >
      {/* <SocialMediaIcons /> */}
      <NavMenu />
      {enabled.includes("auth") && <LoginModalButton />}
    </Box>
  );
};
