import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useLoggingIn } from "../../../hooks/auth/useLoggingIn";

const LinkSection = () => {
  const { isLoggingIn, error, isLoggedIn } = useLoggingIn();
  return (
    <Flex justifyContent={"space-around"} w="full">
      <Link href={"/create-pool"} passHref>
        <Box
          color={isLoggedIn ? "gray.200" : "gray.600"}
          as="a"
          pointerEvents={isLoggedIn ? "unset" : "none"}
          cursor={isLoggedIn ? "pointer" : "default"}
        >
          <Box as="span" fontSize={"2xl"} fontWeight="bold">
            Create Pool
          </Box>
        </Box>
      </Link>
      <Link href={"/view-pool"} passHref>
        <Box
          color={isLoggedIn ? "gray.200" : "gray.600"}
          as="a"
          pointerEvents={isLoggedIn ? "unset" : "none"}
          cursor={isLoggedIn ? "pointer" : "default"}
        >
          <Box as="span" fontSize={"2xl"} fontWeight="bold">
            View Pool
          </Box>
        </Box>
      </Link>
    </Flex>
  );
};

export default LinkSection;
