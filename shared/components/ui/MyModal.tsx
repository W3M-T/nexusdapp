import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { customColors } from "../../../config/chakraTheme";

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
        <ModalOverlay
          background={"rgba(0,0,0,0.8)"}
          backdropFilter={"blur(5px)"}
          {...overlayProps}
        />
        <ModalContent
          background={customColors.myCustomColor.base}
          borderRadius="15px"
          width={"95%"}
          {...props}
        >
          {children}
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyModal;
