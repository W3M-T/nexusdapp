import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { LoginComponent } from "../tools/LoginComponent";
const CustomModalOverlay = () => {
  return <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(5px)" />;
};

interface IProps {
  opened: boolean;
  close: () => void;
  isLoggingIn: boolean;
}

const LoginModal = ({ opened, close, isLoggingIn }: IProps) => {
  return (
    <Modal isOpen={opened} size="sm" onClose={close} isCentered>
      <CustomModalOverlay />
      <ModalContent
        bgColor="dappTemplate.dark.darker"
        px={6}
        pt={7}
        pb={10}
        position="relative"
      >
        <ModalCloseButton _focus={{ outline: "none" }} />
        <ModalBody>
          <Text textAlign="center" mb={7} fontWeight="black" fontSize="2xl">
            Connect your wallet
          </Text>
          {isLoggingIn && (
            <Flex
              alignItems="center"
              backdropFilter="blur(3px)"
              bgColor="blackAlpha.700"
              justifyContent="center"
              position="absolute"
              inset={0}
            >
              <Spinner
                thickness="3px"
                speed="0.4s"
                color="dappTemplate.color2.base"
                size="xl"
              />
            </Flex>
          )}
          <LoginComponent />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
