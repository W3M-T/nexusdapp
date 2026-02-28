import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import Link from "next/link";
import { customColors } from "../../../config/chakraTheme";
import { routes } from "../../utils/routes";

const ButtonNav = () => {
    const { isLoggedIn } = useGetLoginInfo();

    return (
          <Flex
                  w="full"
                  position={"fixed"}
                  bottom={0}
                  left={0}
                  right={0}
                  bg={customColors.myCustomColor.darker}
                  px={{ sm: 5, lsm: 7 }}
                  py={3}
                  justifyContent="space-around"
                  display={{ sm: "flex", md: "none" }}
                  zIndex={1000}
                >
            {routes.map((route) => {
                          if ((!isLoggedIn && !route.public) || route.outNav || route.hideFromMobile) {
                                      // if (route.route !== "/") {
                                      return null;
                                      // }
                          }
                          const isNexusGame = route.name === "Nexus";
                          return (
                                      <Link href={route.route} key={route.route}>
                                                  <Flex
                                                                  fontWeight={"bold"}
                                                                  _hover={{
                                                                                    textShadow: "0 0 10px " + customColors.color2.base,
                                                                  }}
                                                                  flexDir="column"
                                                                  justifyContent={"center"}
                                                                  alignItems="center"
                                                                  position="relative"
                                                                >
                                                    {isNexusGame && (
                                                                                  <Box
                                                                                                      position="absolute"
                                                                                                      top="-10px"
                                                                                                      right="-12px"
                                                                                                      bg="orange.400"
                                                                                                      color="black"
                                                                                                      fontSize="6px"
                                                                                                      fontWeight="extrabold"
                                                                                                      px="4px"
                                                                                                      py="1px"
                                                                                                      borderRadius="sm"
                                                                                                      lineHeight="1.2"
                                                                                                      letterSpacing="0.5px"
                                                                                                      transform="rotate(12deg)"
                                                                                                      zIndex={1}
                                                                                                    >
                                                                                                    ALPHA
                                                                                  </Box>
                                                                )}
                                                                <Box>
                                                                                <Icon as={route.icon} fontSize="25px" />
                                                                </Box>
                                                                <Text fontSize="10px">{route.name}</Text>
                                                  </Flex>
                                      </Link>
                                    );
                })}
          </Flex>
        );
};

export default ButtonNav;</Flex>
