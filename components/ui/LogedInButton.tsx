import {
  Box,
  Center,
  Icon,
  Text,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useAccount } from "../../hooks/auth/useAccount";
import { shortenHash } from "../../utils/shortenHash";
import { ActionButton } from "../tools/ActionButton";

const LoggedInMenu = dynamic(() => import("./LoggedInMenu"));

const LogedInButton = () => {
  const account = useAccount();
  const { isOpen, onClose, onToggle } = useDisclosure();

  const ref = useRef();
  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  const username = account.username.slice(0, account.username.length - 7);

  const userDisplay =
    username !== "" ? "@" + username : shortenHash(account.address);

  return (
    <Box position={"relative"} w={{ sm: "full", lg: "auto" }} ref={ref}>
      <ActionButton
        onClick={onToggle}
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
          <Icon as={isOpen ? FaAngleUp : FaAngleDown} fontSize="20px" ml={2} />
        </Center>
      </ActionButton>
      {isOpen && <LoggedInMenu />}
    </Box>
  );
};

export default LogedInButton;
