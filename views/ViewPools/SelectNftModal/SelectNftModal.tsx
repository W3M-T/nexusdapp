import {
  Center,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useState } from "react";
import { ActionButton } from "../../../components/tools/ActionButton";
import MyModal from "../../../components/ui/MyModal";
import useGetNfts from "../../../hooks/tools/useGetNfts";
import { INft } from "../../../redux/types/tokens.interface";
import StakeNftItem from "./StakeNftItem";

interface IProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
  onConfirm: (nft: INft) => void;
  colelction: string;
}

const SelectNftModal = ({
  isOpenModal,
  onCloseModal,
  onConfirm,
  colelction,
}: IProps) => {
  const [selectedNFT, setSelectedNFT] = useState<INft>(null);
  const handleSelectNFT = (NFT) => {
    setSelectedNFT(NFT);
  };

  const nfts = useGetNfts({ filter: { key: "collection", value: colelction } });

  const handleStake = () => {
    onCloseModal();
    onConfirm(selectedNFT);
  };
  return (
    <MyModal
      isOpen={isOpenModal}
      onClose={onCloseModal}
      size="4xl"
      px="3"
      py={5}
    >
      <ModalCloseButton
        border="none"
        outline={"none"}
        _focus={{ boxShadow: "none" }}
        right={5}
        top={4}
      />
      <ModalHeader borderRadius="1.5rem 1.5rem 0 0"> My NFTs</ModalHeader>
      <ModalBody>
        <Flex
          justifyContent={"center"}
          columnGap={5}
          rowGap="10"
          flexWrap="wrap"
          mt={10}
        >
          {nfts.map((nft) => {
            return (
              <StakeNftItem
                nft={nft}
                key={nft.nonce}
                onClick={() => handleSelectNFT(nft)}
                selected={selectedNFT?.identifier === nft.identifier}
              />
            );
          })}
          {nfts.length === 0 && (
            <Center>You don’t have any NFTs for this collection</Center>
          )}
        </Flex>
      </ModalBody>

      <ModalFooter>
        <Center w={"full"}>
          <ActionButton mx={3} onClick={onCloseModal}>
            Cancel
          </ActionButton>
          {nfts.length > 0 && (
            <ActionButton mx={3} onClick={handleStake}>
              Confirm
            </ActionButton>
          )}
        </Center>
      </ModalFooter>
    </MyModal>
  );
};

export default SelectNftModal;
