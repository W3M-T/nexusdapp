import { Box, Link, Text, Image, useMediaQuery } from "@chakra-ui/react";
import newLogo from "../../../public/logoNexus.png";
import NextImg from "./NextImg";
import { breakpoints, customSizes } from "../../../config/chakraTheme";
import { isMobile } from "../../utils/isMobile";

export const Logo = () => {
  const isSmallDevice = isMobile();

  return (
    <Link href="/" isExternal>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        userSelect="none"
      >
        <NextImg src={newLogo} alt="The Nexus dApp Logo" width={customSizes.logoIcon} />
        {/* <Text
          as="span"
          cursor="pointer"
          mb={0}
          fontSize="3xl"
          fontWeight="black"
          color="dappTemplate.white"
          textAlign={{ sm: "center", md: "left" }}
          ml={2}
        >
          The NFT Nexus
        </Text> */}
      </Box>
    </Link>
  );
};
