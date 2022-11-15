import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { ActionButton } from "../../../shared/components/tools/ActionButton";
import { useLoggingIn } from "../../../shared/hooks/auth/useLoggingIn";

const LinkSection = () => {
  const { isLoggedIn } = useLoggingIn();
  return (
    <Flex
      justifyContent={{ sm: "center", md: "space-around" }}
      alignItems="center"
      w="full"
      flexDir={{ sm: "column", md: "row" }}
      rowGap={10}
    >
      <ActionButton disabled={!isLoggedIn} w="fit-content">
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
      </ActionButton>
      <ActionButton disabled={!isLoggedIn}>
        <Link href={"/view-pool"} passHref>
          <Box
            color={isLoggedIn ? "gray.200" : "gray.600"}
            as="a"
            pointerEvents={isLoggedIn ? "unset" : "none"}
            cursor={isLoggedIn ? "pointer" : "default"}
          >
            <Box as="span" fontSize={"2xl"} fontWeight="bold">
              View Pools
            </Box>
          </Box>
        </Link>
      </ActionButton>
    </Flex>
  );
};

export default LinkSection;
