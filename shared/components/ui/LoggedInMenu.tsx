import { Box, Flex, Link as ChkLink, Text, VStack } from "@chakra-ui/react";
import { logout } from "@multiversx/sdk-dapp/utils";
import Link from "next/link";
import { customColors, customSizes } from "../../../config/chakraTheme";
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
      mt={5}
      position={"absolute"}
      width={ customSizes.loginButton }
      display="flex"
      justifyContent={"center"}
    >
      <CardWrapper w={"full"} px={0} zIndex={99} bgColor={customColors.myCustomColor.darker} border={"2px solid"} borderColor={customColors.myCustomColor.lighter}>
        <VStack gap={2}>
          {!isNftCreator ? 
          <Flex
            py={1}
            cursor="pointer"
            px={8}
            w="full"
            _hover={{
              textShadow: "0 0 10px " + customColors.color2.base,
            }}
          >
            <Link href={route.create.route}>Create a Pool</Link>
          </Flex> :
          <Flex
            py={1}
            cursor="pointer"
            px={8}
            w="full"
            _hover={{
              textShadow: "0 0 10px " + customColors.color2.base,
            }}
          >
            <Link href={route.nftCollectionOwner.route}>
                Creator Dashboard
            </Link>
          </Flex>}
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
              <Link href={route.scOwner.route}>Owner Dashboard</Link>
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
            onClick={() => logout()}
          >
            <ChkLink href={"https://Web3Mermaids.com"} isExternal>
              Web3Mermaids
            </ChkLink>
          </Flex>
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
        </VStack>
      </CardWrapper>
    </Box>
  );
};

export default LoggedInMenu;
