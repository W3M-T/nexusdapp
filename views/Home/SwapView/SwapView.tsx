import { Box, Center, Grid, HStack, ModalBody, ModalCloseButton, ModalContent, Text, VStack, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import { MainLayout } from "../../../shared/components/ui/MainLayout";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/hooks/core/useRedux";
import { selectUserAddress } from "../../../shared/redux/slices/settings";
import SwapSection from "./SwapSection/SwapSection";
import WalletSection from "./WalletSection/WalletSection";
import { CardWrapper } from "../../../shared/components/ui/CardWrapper";
import MyModal from "../../../shared/components/ui/MyModal";
import { ActionButton } from "../../../shared/components/tools/ActionButton";
import { breakpoints, customColors } from "../../../config/chakraTheme";
import { PiWalletBold } from "react-icons/pi";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const SwapView = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLargerThanLg] = useMediaQuery(`(min-width: ${breakpoints.lg})`);
  
  return (
    <CardWrapper pb={1} pt={0}>
      <Center gap={2}>
        <SwapSection titleLeft={isLargerThanLg ? false : true}/>
        {isLargerThanLg ? <WalletSection/>
        :
        <ActionButton
          onClick={onOpen}
          position={"absolute"}
          top={127}
          right={10}
        >
          <Center gap={2}>
          <Text>Wallet</Text>
          <PiWalletBold size={"20px"}/>
          </Center>
        </ActionButton>}
      </Center>
      {isOpen && <WalletModal isOpen={isOpen} onClose={onClose} />}
    </CardWrapper>
  );
};

export default SwapView;

const WalletModal = ({ isOpen, onClose }: IProps) => {
  return (
  <MyModal isOpen={isOpen} onClose={onClose} size="4xl">
    <ModalContent p={0} m={1}>
      <ModalBody w={"full"} p={2} background={"rgba(0, 0, 0, 1)"}>
        <ModalCloseButton
          border="none"
          outline={"none"}
          _focus={{ boxShadow: "none" }}
          right={6}
          top={12}
        />
        <WalletSection pt={4} coinsHeight="60vh"/>
      </ModalBody>
    </ModalContent>
  </MyModal>
  );
}