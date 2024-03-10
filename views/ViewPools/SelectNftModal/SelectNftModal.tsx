import {
  Center,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ActionButton } from "../../../shared/components/tools/ActionButton";
import MyModal from "../../../shared/components/ui/MyModal";
import useGetNfts from "../../../shared/hooks/tools/useGetNfts";
import { INft } from "../../../shared/redux/types/tokens.interface";
import StakeNftItem from "./StakeNftItem";
import { customColors } from "../../../config/chakraTheme";
interface IProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
  onConfirm: (nfts: INft[]) => void;
  colelction: string;
}

const SelectNftModal = ({
  isOpenModal,
  onCloseModal,
  onConfirm,
  colelction,
}: IProps) => {
  function filterResponse(nfts: INft[]): INft[] {
    return nfts.filter((nft) => nft.type !== "SemiFungibleESDT");
  }
  const nfts: INft[] = useGetNfts(
    {
      filter: { key: "collection", value: colelction },
    },
    filterResponse
  );
  
  const [selectedNFTs, setSelectedNFTs] = useState<INft[]>([nfts?.[0]] || []);

  const handleSelectNFT = (NFT) => {
    if (selectedNFTs.length <= 10) {
      // Check if the NFT is already selected
      const isAlreadySelected = selectedNFTs.some((selectedNFT) => selectedNFT.identifier === NFT.identifier && selectedNFT.nonce == NFT.nonce);
  
      // If the NFT is not already selected, add it to the selectedNFTs array
      if (!isAlreadySelected) {
        setSelectedNFTs([...selectedNFTs, NFT]);
      } else {
        // If the NFT is already selected, remove it from the selectedNFTs array
        setSelectedNFTs(selectedNFTs.filter((selectedNFT) => !(selectedNFT.identifier === NFT.identifier && selectedNFT.nonce == NFT.nonce)));
      }
    }
  };
  

  const handleStake = () => {
    onCloseModal();
    onConfirm(selectedNFTs);
  };

  return (
    <MyModal
      isOpen={isOpenModal}
      onClose={onCloseModal}
      size="4xl"
      px="3"
      background={customColors.myCustomColor.base}
      borderRadius="20px"
    >
      <ModalCloseButton
        border="none"
        outline={"none"}
        _focus={{ boxShadow: "none" }}
        right={5}
        top={4}
      />
      <ModalHeader borderRadius="1.5rem 1.5rem 0 0"> My NFTs</ModalHeader>
      <ModalBody borderRadius={"20px"} background={customColors.myCustomColor.lighter}>
        <Flex
          justifyContent={"space-evenly"}
          columnGap={5}
          rowGap="10"
          flexWrap="wrap"
          my={6}
          maxH={"60vh"}
          overflowY={"auto"}
        >
          {nfts.map((nft) => {
            return (
              <StakeNftItem
                nft={nft}
                key={nft.nonce}
                onClick={() => handleSelectNFT(nft)}
                selected={Boolean(
                  selectedNFTs.find(
                    (selectednft) => selectednft.identifier === nft.identifier
                  )
                )}
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
