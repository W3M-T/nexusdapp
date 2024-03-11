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
  ModalOverlay,
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
import MyModal from "../../../shared/components/ui/MyModal";
import { customColors } from "../../../config/chakraTheme";
import { egldFee } from "../../../config/network";
import { selectUserAddress } from "../../../shared/redux/slices/settings";
import getEgldBalance from "../../../shared/services/sc/scQueries/getEgldBalance";
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
  const connectedAddress = useAppSelector(selectUserAddress);

  const needToUnstake = useAppSelector(selectCanUserStake);

  const nftsStaked = useAppSelector(selectUserStaked);

  function filterResponse(nfts: INft[]): INft[] {
    return nfts.filter((nft) => nft.type === "NonFungibleESDT");
  }

  const nfts = useGetNfts(
    {
      filter: { key: "collection", value: pool.collection },
    },
    filterResponse
  );
  
  const [selectedNFTs, setSelectedNFT] = useState<INft[]>([nfts?.[0]] || []);
  
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

  const handleStake = () => {
    onCloseModal();
    onConfirm(selectedNFTs);
  };

  const createdDate = new Date(pool.timestam * 1000);
  const endDate = addDays(createdDate, pool.poolDuration);

  const [userHasEgldForFee, setUserHasEgldForFee] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEgldBalance = await getEgldBalance(connectedAddress);
        const hasEgldForFee = Number(userEgldBalance.balance) / 10**18 >= egldFee;
        setUserHasEgldForFee(hasEgldForFee);
      } catch (error) {
        console.error("Error fetching EGLD balance:", error);
        setUserHasEgldForFee(false);
      }
    };

    fetchData();
  }, [connectedAddress]);
  
  const isStakingDisabled = pool ? pool.isStakingDisabled : true;

  return (
    <MyModal isOpen={isOpenModal} onClose={onCloseModal} size="3xl">
      <ModalContent bgColor={customColors.myCustomColor.base} borderRadius="20px" zIndex={1000} px={4}>
        <ModalHeader borderRadius="1.5rem 1.5rem 0 0">
          {pool.collection}
        </ModalHeader>
        <ModalBody borderRadius={"20px"} background={customColors.myCustomColor.lighter}>
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
            justifyContent={"space-evenly"}
            flexWrap="wrap"
            py={5}
            maxH={"65vh"}
            overflowY={"auto"}
            gap={5}
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
              <Center py={6}>You don’t have any NFTs for this collection</Center>
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
                  isStakingDisabled ? "Staking in this pool is disabled by the Pool Creator." : 
                  needToUnstake.data ? "You must first unstake your NFTs from completed pools (marked red)." :
                  !userHasEgldForFee ? "You need " + egldFee + " EGLD for covering the fee." :
                  "Make sure you have staked at least one NFT of PARROT, EXPLORER, or TEDDY1 collections."
                }
                borderRadius={"5px"}
                isDisabled={
                  !isStakingDisabled && !(pool.collection === "" && !hasStakenForAEN) &&
                  !needToUnstake.data && userHasEgldForFee
                }
              >
                <Box>
                  {nftsStaked.status === "success" && (
                    <ActionButton
                      w="100px"
                      disabled={
                        isStakingDisabled ||
                        (pool.collection === "" && !hasStakenForAEN) ||
                        needToUnstake.data ||
                        !userHasEgldForFee
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
    </MyModal>
  );
};

export default HomePoolModal;
