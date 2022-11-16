import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { customColors } from "../../../config/chakraTheme";
import { useLoggingIn } from "../../hooks/auth/useLoggingIn";
import { routes } from "../../utils/routes";
const ButtonNav = () => {
  const { isLoggedIn } = useLoggingIn();

  return (
    <Flex
      w="full"
      position={"fixed"}
      bottom={0}
      left={0}
      right={0}
      bg={customColors.color2.darker}
      px={{ sm: 5, lsm: 7 }}
      py={3}
      justifyContent="space-between"
      display={{ sm: "flex", md: "none" }}
    >
      {routes.map((route) => {
        if ((!isLoggedIn && !route.public) || route.outNav) {
          // if (route.route !== "/") {
          return null;
          // }
        }
        return (
          <Link href={route.route} key={route.route}>
            <a>
              <Flex
                fontWeight={"bold"}
                _hover={{
                  textShadow: "0 0 10px " + customColors.color2.base,
                }}
                flexDir="column"
                justifyContent={"center"}
                alignItems="center"
              >
                <Box>
                  <Icon as={route.icon} fontSize="25px" />
                </Box>
                <Text fontSize="10px">{route.name}</Text>
              </Flex>
            </a>
          </Link>
        );
      })}
    </Flex>
  );
};

export default ButtonNav;
