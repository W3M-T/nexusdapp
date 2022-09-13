import { useDisclosure } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useLogin } from "../../hooks/auth/useLogin";
import { useEffectOnlyOnUpdate } from "../../hooks/tools/useEffectOnlyOnUpdate";
import { ActionButton } from "../tools/ActionButton";
import LogedInButton from "../ui/LogedInButton";

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
        <LogedInButton />
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
