import { Box, useDisclosure } from "@chakra-ui/react";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks/account/useGetAccountInfo";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import dynamic from "next/dynamic";
import { useEffectOnlyOnUpdate } from "../../hooks/tools/useEffectOnlyOnUpdate";
import LogedInButton from "../ui/LogedInButton";
import { ActionButton } from "./ActionButton";
import { ref } from "valtio";
import { customSizes } from "../../../config/chakraTheme";

const LoginModal = dynamic(() => import("../ui/LoginModal"));
interface LoginModalButtonProps {
  onClose?: () => void;
  onOpen?: () => void;
}

export const LoginModalButton = ({
  onClose,
  onOpen,
}: LoginModalButtonProps) => {
  const { isLoggedIn } = useGetLoginInfo();
  const { isAccountLoading: isLoggingIn } = useGetAccountInfo();
  const {
    isOpen: opened,
    onOpen: open,
    onClose: close,
  } = useDisclosure({ onClose, onOpen });

  useEffectOnlyOnUpdate(() => {
    if (isLoggedIn) {
      close();
    }
  }, [isLoggedIn]);

  return (
    <Box position={"relative"} w={{ sm: "full", lg: customSizes.loginButton.lg }}>
      {isLoggedIn ? (
        <LogedInButton />
      ) : (
        <ActionButton
          w={customSizes.loginButton}
          onClick={open}
          bgColor="dappTemplate.color2.base"
          borderColor={"dappTemplate.color2.base"}
          color={"black"}
          fontWeight="semibold"
          _hover={{
            bgColor: "dappTemplate.color2.darker",
          }}
        >
          Connect
        </ActionButton>
      )}
      {opened && (
        <LoginModal opened={opened} close={close} isLoggingIn={isLoggingIn} />
      )}
    </Box>
  );
};
