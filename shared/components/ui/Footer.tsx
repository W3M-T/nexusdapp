import { Box, Container } from "@chakra-ui/react";
import { customColors } from "../../../config/chakraTheme";

export const Footer = () => {
  return (
    <Box
      height="60px"
      bgColor={customColors.myCustomColor.darker}
      color="gray.500"
      display={{ sm: "none", md: "flex" }}
      alignItems="center"
      as="footer"
    >
      <Container
        maxW="container.xl"
        fontSize="sm"
        fontWeight="normal"
        textAlign="center"
      >
        <Box>Made with ❤️ by the Nexus Dapp Team.</Box>
        <Box>Copyright © 2022 The NFT NEXUS - All Rights Reserved.</Box>
      </Container>
    </Box>
  );
};
