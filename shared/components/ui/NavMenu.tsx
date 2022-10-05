import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { customColors } from "../../../config/chakraTheme";
import { useLoggingIn } from "../../hooks/auth/useLoggingIn";
import { routes } from "../../utils/routes";

const NavMenu = () => {
  const { isLoggedIn } = useLoggingIn();

  return (
    <Flex alignItems={"center"} gap={5} mr={{ sm: 0, lg: "24" }}>
      {routes.map((route) => {
        if (!isLoggedIn || route.outNav) {
          // if (route.route !== "/") {
          return null;
          // }
        }
        return (
          <Link href={route.route} key={route.route}>
            <a>
              <Box
                fontWeight={"bold"}
                _hover={{
                  textShadow: "0 0 10px " + customColors.color2.base,
                }}
              >
                {route.name}
              </Box>
            </a>
          </Link>
        );
      })}
    </Flex>
  );
};

export default NavMenu;