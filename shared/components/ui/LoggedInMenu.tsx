import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { logout } from "@elrondnetwork/dapp-core";
import Link from "next/link";
import { customColors } from "../../../config/chakraTheme";
import { useAppSelector } from "../../hooks/core/useRedux";
import { selectisNftCreator, selectisScOwner } from "../../redux/slices/pools";
import { route } from "../../utils/routes";
import { CardWrapper } from "./CardWrapper";

const LoggedInMenu = () => {
  const isAdmin = useAppSelector(selectisScOwner);
  const isNftCreator = useAppSelector(selectisNftCreator);

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

          {isAdmin && (
            <Flex
              py={1}
              cursor="pointer"
              px={8}
              w="full"
              _hover={{
                textShadow: "0 0 10px " + customColors.color2.base,
              }}
            >
              <Link href={route.scOwner.route}>
                <a>Owner Dashboard</a>
              </Link>
            </Flex>
          )}

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
