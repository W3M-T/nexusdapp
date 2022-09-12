import { useDisclosure } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useLogin } from "../../hooks/auth/useLogin";
import { useLogout } from "../../hooks/auth/useLogout";
import { useEffectOnlyOnUpdate } from "../../hooks/tools/useEffectOnlyOnUpdate";
import { ActionButton } from "../tools/ActionButton";

const LoginModal = dynamic(() => import("../ui/LoginModal"));
interface LoginModalButtonProps {
  onClose?: () => void;
  onOpen?: () => void;
}

export const LoginModalButton = ({
  onClose,
  onOpen,
}: LoginModalButtonProps) => {
  const { isLoggedIn, isLoggingIn } = useLogin();
  const { logout } = useLogout();
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
    <>
      {isLoggedIn ? (
        <ActionButton onClick={logout} bgColor="dappTemplate.color2.dark">
          Disconnect
        </ActionButton>
      ) : (
        <ActionButton
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
    </>
  );
};
