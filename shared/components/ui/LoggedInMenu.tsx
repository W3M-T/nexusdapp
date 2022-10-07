import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { customColors } from "../../../config/chakraTheme";
import { useLogout } from "../../hooks/auth/useLogout";
import { useAppSelector } from "../../hooks/core/useRedux";
import { selectisNftCreator } from "../../redux/slices/pools";
import { selectIsAdmin } from "../../redux/slices/settings";
import { route } from "../../utils/routes";
import { CardWrapper } from "./CardWrapper";

const LoggedInMenu = () => {
  const { logout } = useLogout();
  const isAdmin = useAppSelector(selectIsAdmin);
  const { data: isNftCreator } = useAppSelector(selectisNftCreator);
  console.log("isNftCreator", isNftCreator);

  return (
    <Box
      right={{ sm: "auto", lg: "0" }}
      mt={2}
      position={"absolute"}
      width={{ sm: "full", lg: "250px" }}
      display="flex"
      justifyContent={"center"}
    >
      <CardWrapper w={{ sm: "250px", lg: "auto" }} px={0} zIndex={99}>
        <VStack gap={2}>
          <Flex
            py={1}
            cursor="pointer"
            px={8}
            w="full"
            _hover={{
              textShadow: "0 0 10px " + customColors.color2.base,
            }}
            onClick={() => logout()}
          >
            Disconnect
          </Flex>

          <Flex
            py={1}
            cursor="pointer"
            px={8}
            w="full"
            _hover={{
              textShadow: "0 0 10px " + customColors.color2.base,
            }}
          >
            {isAdmin ? (
              <Link href={route.scOwner.route}>
                <a>Owner Dashboard</a>
              </Link>
            ) : (
              <Text color="gray.400" cursor={"not-allowed"}>
                Owner Dashboard
              </Text>
            )}
          </Flex>

          <Flex
            py={1}
            cursor="pointer"
            px={8}
            w="full"
            _hover={{
              textShadow: "0 0 10px " + customColors.color2.base,
            }}
          >
            {isNftCreator ? (
              <Link href={route.nftCollectionOwner.route}>
                <a> NFT Creator Dashboard</a>
              </Link>
            ) : (
              <Text color="gray.400" cursor={"not-allowed"}>
                NFT Creator Dashboard
              </Text>
            )}
          </Flex>
        </VStack>
      </CardWrapper>
    </Box>
  );
};

export default LoggedInMenu;
