import { Box, Flex } from "@chakra-ui/react";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import Link from "next/link";
import { customColors } from "../../../config/chakraTheme";
import { routes } from "../../utils/routes";
import { useRouter } from "next/router";

const NavMenu = () => {
  const { isLoggedIn } = useGetLoginInfo();
  const router = useRouter();
  console.log('⚠️ ~ router:', router);
  
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
        return (
          <Link href={route.route} key={route.route}>
            <Box
              fontSize={"md"}
              fontWeight={"bold"}
              textShadow={isActive ? "0 0 15px " + customColors.color2.base : "none"}
              _hover={{
                textShadow: "0 0 15px " + customColors.color2.base,
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
