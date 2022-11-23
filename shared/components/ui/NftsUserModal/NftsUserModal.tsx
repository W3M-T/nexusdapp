import {
  Grid,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import useSWR from "swr";
import { useAppSelector } from "../../../hooks/core/useRedux";
import { selectUserAddress } from "../../../redux/slices/settings";
import { INft } from "../../../redux/types/tokens.interface";
import { swrFetcher } from "../../../services/rest/axiosEldron";
import { noShowMedia } from "../../../utils/excludeNft";
import MyModal from "../MyModal";
import UserNftCard from "./UserNftCard";
interface IProps {
  onClose: () => void;
  isOpen: boolean;
}
const NftsUserModal = ({ onClose, isOpen }: IProps) => {
  const address = useAppSelector(selectUserAddress);

  const { data: nfts } = useSWR<INft[]>(
    address && `/accounts/${address}/nfts`,
    swrFetcher
  );
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
            templateColumns={{ sm: "1fr 1fr 1fr", lg: "1fr 1fr 1fr 1fr" }}
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
