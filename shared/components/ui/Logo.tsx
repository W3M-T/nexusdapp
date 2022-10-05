import { Box, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export const Logo = () => {
  return (
    <NextLink href="/">
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        position="relative"
        userSelect="none"
      >
        <Text
          as="span"
          cursor="pointer"
          mb={0}
          fontSize="3xl"
          fontWeight="black"
          color="dappTemplate.white"
          textAlign={{ sm: "center", md: "left" }}
        >
          The NFT Nexus
        </Text>
      </Box>
    </NextLink>
  );
};
