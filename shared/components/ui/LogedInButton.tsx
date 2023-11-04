import {
  Box,
  Center,
  Icon,
  Text,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks/account/useGetAccountInfo";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { shortenHash } from "../../utils/shortenHash";
import { ActionButton } from "../tools/ActionButton";
import { customSizes } from "../../../config/chakraTheme";

const LoggedInMenu = dynamic(() => import("./LoggedInMenu"));

const LogedInButton = () => {
  const { account } = useGetAccountInfo();
  const { isOpen, onClose, onToggle } = useDisclosure();

  const ref = useRef();
  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  if (!account) {
    return null;
  }
  const username = account?.username
    ? account.username.slice(0, account.username.length - 7)
    : "";

  const userDisplay =
    username !== "" ? "@" + username : shortenHash(account?.address, 7);

  return (
    <Box position={"relative"} w={{ sm: "full", lg: customSizes.loginButton.lg }} ref={ref}>
      <ActionButton
        onClick={onToggle}
        w={customSizes.loginButton}
        alignItems={"center"}
        bgColor="dappTemplate.color2.base"
        borderColor={"dappTemplate.color2.base"}
        color={"black"}
        fontWeight="semibold"
        _hover={{
          bgColor: "dappTemplate.color2.darker",
        }}
      >
        <Center>
          <Text fontSize={"xs"}>{userDisplay}</Text>
          <Icon as={isOpen ? FaAngleUp : FaAngleDown} fontSize="22px" ml={3} />
        </Center>
      </ActionButton>
      {isOpen && <LoggedInMenu />}
    </Box>
  );
};

export default LogedInButton;
