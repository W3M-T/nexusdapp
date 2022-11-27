import {
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

const UserNftCard = dynamic(() => import("./UserNftCard"));

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}
const NftsUserModal = ({ onClose, isOpen }: IProps) => {
  const nfts = useGetNfts();
  return (
    <MyModal isOpen={isOpen} onClose={onClose} size={"6xl"}>
      <ModalContent background={"dappTemplate.dark.darker"}>
        <ModalCloseButton
          border="none"
          outline={"none"}
          _focus={{ boxShadow: "none" }}
          right={5}
          top={4}
        />
        <ModalHeader borderRadius="1.5rem 1.5rem 0 0">My NFTs</ModalHeader>
        <ModalBody>
          <Grid
            templateColumns={{
              sm: "1fr ",
              lsm: "1fr 1fr",
              md: "1fr 1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
            }}
            gap={5}
          >
            {nfts
              .filter((nft) => !noShowMedia(nft))
              .map((nft) => {
                return <UserNftCard key={nft.identifier} nft={nft} />;
              })}
          </Grid>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </MyModal>
  );
};

export default NftsUserModal;
