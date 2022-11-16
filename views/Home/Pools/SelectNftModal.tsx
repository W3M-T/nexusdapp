import {
  Box,
  Center,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ActionButton } from "../../../shared/components/tools/ActionButton";
import useGetNfts from "../../../shared/hooks/tools/useGetNfts";
import { IExistingPool } from "../../../shared/redux/types/pools.interface";
import { INft } from "../../../shared/redux/types/tokens.interface";
import { formatBalance } from "../../../shared/utils/formatBalance";
import { formatTokenI } from "../../../shared/utils/formatTokenIdentifier";
import StakeNftItem from "./StakeNftItem";
interface IProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
  onConfirm: (nft: INft) => void;
  pool: IExistingPool;
  hasStakenForAEN: boolean;
}

const HomePoolModal = ({
  isOpenModal,
  onCloseModal,
  onConfirm,
  pool,
  hasStakenForAEN,
}: IProps) => {
  const [selectedNFT, setSelectedNFT] = useState<INft>(null);
  const handleSelectNFT = (NFT) => {
    setSelectedNFT(NFT);
  };

  const nfts = useGetNfts({
    filter: { key: "collection", value: pool.collection },
  });

  const handleStake = () => {
    onCloseModal();
    onConfirm(selectedNFT);
  };
  useEffect(() => {
    if (nfts.length === 1) {
      setSelectedNFT(nfts[0]);
    }
  }, [nfts]);
  const date = new Date(pool.timestam * 1000);

  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal}>
      <ModalCloseButton
        border="none"
        outline={"none"}
        _focus={{ boxShadow: "none" }}
        right={5}
        top={4}
      />
      <ModalContent background={"dappTemplate.dark.darker"}>
        <ModalHeader borderRadius="1.5rem 1.5rem 0 0">
          {pool.collection}
        </ModalHeader>
        <ModalBody>
          <Flex flexDir={"column"} gap={1}>
            <Text>
              <Box as="span" fontWeight={"bold"}>
                {" "}
                Daily Rewards :
              </Box>{" "}
              {formatBalance({ balance: pool.rewards })}{" "}
              {formatTokenI(pool.token)}{" "}
            </Text>
            <Text>
              {" "}
              <Box as="span" fontWeight={"bold"}>
                Created :{" "}
              </Box>{" "}
              {date.toLocaleDateString("en-US")}{" "}
            </Text>
          </Flex>
          <Text mb={2}>
            {" "}
            <Box as="span" fontWeight={"bold"}>
              Total NFTs :{" "}
            </Box>{" "}
            {pool.nftsNow} / {pool.nfts}{" "}
          </Text>

          <Divider mt={4} />
          <Flex
            justifyContent={"center"}
            columnGap={5}
            rowGap="10"
            flexWrap="wrap"
            mt={4}
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
              <Tooltip
                label="Make sure you have staked at least one NFT of PARROT, EXPLORER, or TEDDY1 collections."
                borderRadius={"5px"}
                isDisabled={!(pool.collection === "" && !hasStakenForAEN)}
              >
                <Box>
                  <ActionButton mx={3} onClick={handleStake}>
                    Confirm
                  </ActionButton>
                </Box>
              </Tooltip>
            )}
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HomePoolModal;
