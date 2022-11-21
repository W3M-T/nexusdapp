import { Box, Container } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box
      height="80px"
      bgColor="dappTemplate.dark.darker"
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
        <Box>Made with ❤️ by the 💧 $WATER Community.</Box>
        <Box>Copyright © 2022 The NFT NEXUS - All Rights Reserved.</Box>
      </Container>
    </Box>
  );
};
