import { Box, Center, Grid, HStack, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack, useDisclosure, useMediaQuery } from "@chakra-ui/react";
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
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const SwapView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn } = useGetLoginInfo();
  const [isLargerThanLg] = useMediaQuery(`(min-width: ${breakpoints.lg})`);
  
  let showNewSection = true;
  // const address = useAppSelector(selectUserAddress);

  // if (address == "erd13j00d82gs7ec665z202lh25l7tjw6lpaxwe7th4e6uwlsk3r8pgq555qzg" ||
  //   address == "erd1lnmfa5p9j6qy40kjtrf0wfq6cl056car6hyvrq5uxdcalc2gu7zsrwalel" ||
  //   address == "erd10fq6af9vkr6usqc4wf9adsqhdvfz7d0d57pkag5ecmac7486zncsunge5m"
  // ) {
  //   showNewSection = true;
  // }

  return (
    showNewSection ?
    <CardWrapper m={0} pt={0} px={0}>
      <Center gap={1} h={"full"}>
        <SwapSection titleLeft={isLargerThanLg ? false : true}/>
        {isLargerThanLg ? <WalletSection/>
        :
        isLoggedIn && <ActionButton
          onClick={onOpen}
          position={"absolute"}
          top={103}
          right={8}
        >
          <Center gap={2}>
          <Text>Wallet</Text>
          <PiWalletBold size={"20px"}/>
          </Center>
        </ActionButton>}
      </Center>
      {isOpen && <WalletModal isOpen={isOpen} onClose={onClose} />}
    </CardWrapper> :
    <></>
  );
};

export default SwapView;

const WalletModal = ({ isOpen, onClose }: IProps) => {
  return (
  <MyModal isOpen={isOpen} onClose={onClose} size="4xl">
    <ModalOverlay background={"rgba(0,0,0,0.1)"} />
    <ModalContent p={0} mx={1} background={customColors.myCustomColor.lighter}>
      {/* <ModalBody w={"full"} p={2} background={"rgba(0, 0, 0, 1)"}> */}
        <ModalCloseButton
          border="none"
          outline={"none"}
          _focus={{ boxShadow: "none" }}
          right={6}
          top={6}
        />
        <WalletSection pt={0} pb={4} coinsHeight="62vh"/>
      {/* </ModalBody> */}
    </ModalContent>
  </MyModal>
  );
}