import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { customColors } from "../../config/chakraTheme";
import { routes } from "../../utils/routes";

const NavMenu = () => {
  return (
    <Flex alignItems={"center"} gap={5} mr={{ sm: 0, lg: "24" }}>
      {routes.map((route) => {
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
