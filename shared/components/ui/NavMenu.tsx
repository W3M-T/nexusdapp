import { Box, Flex } from "@chakra-ui/react";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import Link from "next/link";
import { customColors } from "../../../config/chakraTheme";
import { routes } from "../../utils/routes";

const NavMenu = () => {
  const { isLoggedIn } = useGetLoginInfo();

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
        return (
          <Link href={route.route} key={route.route}>
            <Box
              fontSize={"md"}
              fontWeight={"bold"}
              _hover={{
                textShadow: "0 0 10px " + customColors.color2.base,
              }}
              className={``}
            >
              {route.destopshow && route.name}
            </Box>
          </Link>
        );
      })}
    </Flex>
  );
};

export default NavMenu;
