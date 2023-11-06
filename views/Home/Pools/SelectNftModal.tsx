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
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { ActionButton } from "../../../shared/components/tools/ActionButton";
import { useAppSelector } from "../../../shared/hooks/core/useRedux";
import useGetNfts from "../../../shared/hooks/tools/useGetNfts";
import {
  selectCanUserStake,
  selectUserStaked,
} from "../../../shared/redux/slices/pools";
import { IExistingPool } from "../../../shared/redux/types/pools.interface";
import { INft } from "../../../shared/redux/types/tokens.interface";
import { formatBalance } from "../../../shared/utils/formatBalance";
import { formatTokenI } from "../../../shared/utils/formatTokenIdentifier";
import StakeNftItem from "./StakeNftItem";
interface IProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
  onConfirm: (nft: INft[]) => void;
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
  const needToUnstake = useAppSelector(selectCanUserStake);

  const nftsStaked = useAppSelector(selectUserStaked);

  const [selectedNFTs, setSelectedNFT] = useState<INft[]>([]);
  const handleSelectNFT = (NFT: INft) => {
    const indexNft = selectedNFTs.findIndex(
      (nft) => nft.identifier === NFT.identifier
    );
    if (indexNft >= 0) {
      const newStakedArray = selectedNFTs.filter((n, i) => i !== indexNft);
      setSelectedNFT(newStakedArray);
    } else {
      if (selectedNFTs.length < 10) {
        setSelectedNFT([...selectedNFTs, NFT]);
      }
    }
  };

  function filterResponse(nfts: INft[]): INft[] {
    return nfts.filter((nft) => nft.type === "NonFungibleESDT");
  }

  const nfts = useGetNfts(
    {
      filter: { key: "collection", value: pool.collection },
    },
    filterResponse
  );

  const handleStake = () => {
    onCloseModal();
    onConfirm(selectedNFTs);
  };
  useEffect(() => {
    if (nfts.length === 1) {
      setSelectedNFT([nfts[0]]);
    }
  }, [nfts]);
  const createdDate = new Date(pool.timestam * 1000);
  const endDate = addDays(createdDate, pool.poolDuration);
  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal}>
      <ModalCloseButton
        border="none"
        outline={"none"}
        _focus={{ boxShadow: "none" }}
        right={5}
        top={4}
      />
      <ModalContent>
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
                Ends :{" "}
              </Box>{" "}
              {endDate.toLocaleDateString("en-US")}{" "}
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
                  key={nft.identifier}
                  onClick={() => handleSelectNFT(nft)}
                  selected={Boolean(
                    selectedNFTs.find((n) => n.identifier === nft.identifier)
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
            <ActionButton mx={3} onClick={onCloseModal} w="100px">
              Cancel
            </ActionButton>
            {nfts.length > 0 && (
              <Tooltip
                label={
                  needToUnstake.data
                    ? "You must first unstake your NFTs from completed pools (marked red)."
                    : "Make sure you have staked at least one NFT of PARROT, EXPLORER, or TEDDY1 collections."
                }
                borderRadius={"5px"}
                isDisabled={
                  !(pool.collection === "" && !hasStakenForAEN) &&
                  !needToUnstake.data
                }
              >
                <Box>
                  {nftsStaked.status === "success" && (
                    <ActionButton
                      w="100px"
                      disabled={
                        (pool.collection === "" && !hasStakenForAEN) ||
                        needToUnstake.data
                      }
                      onClick={handleStake}
                    >
                      Stake
                    </ActionButton>
                  )}
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
