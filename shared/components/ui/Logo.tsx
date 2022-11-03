import { Box, Link, Text } from "@chakra-ui/react";

export const Logo = () => {
  return (
    <Link href="https://thenftnexus.com/" isExternal>
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
    </Link>
  );
};
