import { Box, Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import Link from "next/link";
import { customColors } from "../../../config/chakraTheme";
import { routes } from "../../utils/routes";
import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { FaSortDown } from "react-icons/fa";

const NavMenu = () => {
  const [subMenuOpen, setsubMenuOpen] = useState<any>(false)
  const { isLoggedIn } = useGetLoginInfo();
  const { push } = useRouter();

  return (
    <Flex
      alignItems={"center"}
      gap={3}
      mr={{ sm: 0, lg: "12" }}
      display={{ sm: "none", md: "flex" }}
    >
      {routes.map((route) => {
        if ((!isLoggedIn && !route.public) || route.outNav) {
          return null;
        }
        return (
          <Box key={route.route}>
            <Menu autoSelect={false}>
              <MenuButton
                fontSize={"md"}
                fontWeight={"bold"}
                _hover={{
                  textShadow: "0 0 10px " + customColors.color2.base,
                }}
                className={`!flex !flex-row !items-center`}
                onClick={route.submenu ? () => setsubMenuOpen(route.route) : () => push(`${route.route}`)}
              >
                <div className="flex flex-row items-center gap-x-[10px]">
                  {route.destopshow && route.name}
                  {route.submenu && (
                    <FaSortDown
                      className="text-bold text-[16px]"
                    />
                  )}
                </div>
              </MenuButton>
              {
                route.submenu &&
                <MenuList style={{ backgroundColor: "rgb(28, 15, 58)" }} className="!border-none">
                  {route.submenu && subMenuOpen === route.route && (
                    <>
                      {route.submenu.map((subItem) => (
                        <MenuItem key={subItem.route} style={{ backgroundColor: "rgb(28, 15, 58)" }}>
                          <Link href={subItem.route}>
                            <Box
                              fontSize={"md"}
                              fontWeight={"bold"}
                              _hover={{
                                textShadow: "0 0 10px " + customColors.color2.base,
                              }}
                              className={``}
                            >
                              {subItem.name}
                            </Box>
                          </Link>
                        </MenuItem>
                      ))}
                    </>
                  )}
                </MenuList>
              }
            </Menu>
          </Box>
        );
      })}
    </Flex>
  );
};

export default NavMenu;
