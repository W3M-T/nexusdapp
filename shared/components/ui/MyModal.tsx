import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

const MyModal = ({
  isOpen,
  onClose,
  children,
  size,
  overlayProps = undefined,
  ...props
}) => {
  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={size}
      >
        <ModalOverlay background={"rgba(0,0,0,0.7)"} {...overlayProps} />
        <ModalContent
          background={"dappTemplate.dark.darker"}
          borderRadius="15px"
          width={"90%"}
          {...props}
        >
          {children}
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyModal;
