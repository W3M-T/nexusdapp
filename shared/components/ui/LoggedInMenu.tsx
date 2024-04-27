import { Box, Flex, Link as ChkLink, Text, VStack } from "@chakra-ui/react";
import { logout } from "@multiversx/sdk-dapp/utils";
import Link from "next/link";
import { customColors, customSizes } from "../../../config/chakraTheme";
import { useAppSelector } from "../../hooks/core/useRedux";
import { selectisNftCreator, selectisScOwner } from "../../redux/slices/pools";
import { route } from "../../utils/routes";
import { CardWrapper } from "./CardWrapper";
import useGetIsCreator from "../../hooks/tools/useGetIsCreator";
import { selectUserAddress } from "../../redux/slices/settings";

const LoggedInMenu = () => {
  const isAdmin = useAppSelector(selectisScOwner);
  const connectedAddress = useAppSelector(selectUserAddress);

  const { isCreator: isNftCreator } = useGetIsCreator(connectedAddress);

  return (
    <Box
      right={{ sm: "auto", lg: "0" }}
      mt={5}
      position={"absolute"}
      width={"full"}
      display="flex"
      justifyContent={"center"}
    >
      <CardWrapper w={"full"} py={3} px={0} zIndex={99} bgColor={customColors.myCustomColor.darker} border={"2px solid"} borderColor={customColors.myCustomColor.lighter}>
        <VStack gap={2}>
          <Flex
            py={1}
            cursor="pointer"
            px={2}
            w="full"
            _hover={{
              textShadow: "0 0 10px " + customColors.color2.base,
            }}
          >
            <Link href={route.staked.route}>
                Staked NFTs
            </Link>
          </Flex>

          {/* {!isNftCreator ?  */}
          <Flex
            py={1}
            cursor="pointer"
            px={2}
            w="full"
            _hover={{
              textShadow: "0 0 10px " + customColors.color2.base,
            }}
          >
            <Link href={route.create.route}>Create a Pool</Link>
          </Flex>

          {isNftCreator && <Flex
            py={1}
            cursor="pointer"
            px={2}
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
              px={2}
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
            px={2}
            w="full"
            _hover={{
              textShadow: "0 0 10px " + customColors.color2.base,
            }}
            onClick={() => logout()}
          >
            <ChkLink href={"https://discord.com/channels/1069173229425541140/1069173230142758975"} isExternal>
              Community
            </ChkLink>
          </Flex>
          <Flex
            py={1}
            cursor="pointer"
            px={2}
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
