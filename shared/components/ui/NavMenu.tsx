import { Box, Flex } from "@chakra-ui/react";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";
import Link from "next/link";
import { customColors } from "../../../config/chakraTheme";
import { routes } from "../../utils/routes";

const NavMenu = () => {
  const { isLoggedIn } = useGetLoginInfo();

  return (
    <Flex
      alignItems={"center"}
      gap={5}
      mr={{ sm: 0, lg: "24" }}
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
              fontWeight={"bold"}
              _hover={{
                textShadow: "0 0 10px " + customColors.color2.base,
              }}
            >
              {route.name}
            </Box>
          </Link>
        );
      })}
    </Flex>
  );
};

export default NavMenu;
