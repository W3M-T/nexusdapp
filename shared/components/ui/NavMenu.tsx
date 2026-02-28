import { Box, Flex } from "@chakra-ui/react";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import Link from "next/link";
import { customColors } from "../../../config/chakraTheme";
import { routes } from "../../utils/routes";
import { useRouter } from "next/router";

const NavMenu = () => {
    const { isLoggedIn } = useGetLoginInfo();
    const router = useRouter();

    return (
          <Flex
                  alignItems={"center"}
                  gap={7}
                  mr={{ sm: 0, lg: "12" }}
                  display={{ sm: "none", md: "flex" }}
                >
            {routes.map((route) => {
                          if ((!isLoggedIn && !route.public) || route.outNav) {
                                      // if (route.route !== "/") {
                                      return null;
                                      // }
                          }
                          const isActive = router.pathname === route.route;
                          const isNexusGame = route.name === "Nexus";
                          return (
                                      <Link href={route.route} key={route.route}>
                                                  <Box
                                                                  fontSize={"md"}
                                                                  fontWeight={"bold"}
                                                                  textShadow={isActive ? "0 0 15px " + customColors.color2.base : "none"}
                                                                  _hover={{
                                                                                    textShadow: "0 0 15px " + customColors.color2.base,
                                                                  }}
                                                                  position="relative"
                                                                  display="inline-block"
                                                                >
                                                    {route.name}
                                                    {isNexusGame && (
                                                                                  <Box
                                                                                                      as="span"
                                                                                                      position="absolute"
                                                                                                      top="-8px"
                                                                                                      right="-22px"
                                                                                                      bg="orange.400"
                                                                                                      color="black"
                                                                                                      fontSize="7px"
                                                                                                      fontWeight="extrabold"
                                                                                                      px="3px"
                                                                                                      py="1px"
                                                                                                      borderRadius="sm"
                                                                                                      lineHeight="1.2"
                                                                                                      letterSpacing="0.5px"
                                                                                                      transform="rotate(12deg)"
                                                                                                    >
                                                                                                    ALPHA
                                                                                  </Box>
                                                                )}
                                                  </Box>
                                      </Link>
                                    );
                })}
          </Flex>
        );
};

export default NavMenu;</Flex>
