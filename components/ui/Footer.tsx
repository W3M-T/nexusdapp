import { Box, Container } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box
      height="80px"
      bgColor="dappTemplate.dark.darker"
      color="dappTemplate.white"
      display="flex"
      alignItems="center"
    >
      <Container
        maxW="container.xl"
        fontSize="sm"
        fontWeight="normal"
        textAlign="center"
      >
        <Box>Elrond NFTs Staking Pools </Box>
      </Container>
    </Box>
  );
};
