import {
  Box,
  Grid,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import useGetNfts from "../../../hooks/tools/useGetNfts";
import { noShowMedia } from "../../../utils/excludeNft";
import MyModal from "../MyModal";
import { customColors } from "../../../../config/chakraTheme";

const UserNftCard = dynamic(() => import("./UserNftCard"));

interface IProps {
  onClose: () => void;
  isOpen: boolean;
  nfts: any;
}
const NftsUserModal = ({ onClose, isOpen, nfts }: IProps) => {
  return (
    <MyModal isOpen={isOpen} onClose={onClose} size={"6xl"}>
      <ModalContent background={customColors.myCustomColor.base} borderRadius="20px">
        <ModalCloseButton
          border="none"
          outline={"none"}
          _focus={{ boxShadow: "none" }}
          right={5}
          top={4}
        />
        <ModalHeader borderRadius="1.5rem 1.5rem 0 0">My NFTs</ModalHeader>
        <ModalBody borderRadius={"20px"} background={customColors.myCustomColor.lighter} p={{sm: 2, md: 4}}>
          <Grid
            templateColumns={{
              sm: "1fr 1fr",
              // sm: "1fr",
              md: "1fr 1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
            }}
            gap={{sm: 2, md: 8}}
            maxH={"80vh"}
            // maxW={"100vw"}
            overflowY={"auto"}
            py={4}
            w={"full"}
            justifyItems={"center"}
          >
            {nfts
              .filter((nft) => !noShowMedia(nft))
              .map((nft) => {
                return <UserNftCard key={nft.identifier} nft={nft}/>;
              })}
          </Grid>
        </ModalBody>
      </ModalContent>
    </MyModal>
  );
};

export default NftsUserModal;
