import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { Authenticated } from "../../../shared/components/tools/Authenticated";
import { useAppSelector } from "../../../shared/hooks/core/useRedux";
import { selectUserStaked } from "../../../shared/slices/pools";
import NFTCard from "./NFTCard/NFTCard";
import NftModal from "./NftModal/NftModal";
const StakingSection = () => {
  const stakedNfts = useAppSelector(selectUserStaked);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNft, setSelectedNft] = useState(null);

  const handleViwNft = (nft) => {
    setSelectedNft(nft);
    onOpen();
  };

  return (
    <Box>
      <Center w="full">
        <Heading fontSize={"3xl"} borderBottom="3px solid white">
          Staked NFTs
        </Heading>
      </Center>

      <Authenticated
        spinnerCentered
        fallback={
          <>
            <Text fontWeight="bold" fontSize="2xl" textAlign="center" mt={8}>
              Connect your wallet to view your staked NFTs!
            </Text>
          </>
        }
      >
        <Flex
          justifyContent={"center"}
          columnGap={5}
          rowGap="10"
          flexWrap="wrap"
          mt={10}
        >
          {stakedNfts.data.map((nft) => {
            return (
              <NFTCard
                nft={nft}
                key={nft.nonce}
                onClick={() => handleViwNft(nft)}
              />
            );
          })}
        </Flex>
      </Authenticated>

      {isOpen && (
        <NftModal isOpen={isOpen} onClose={onClose} nft={selectedNft} />
      )}
    </Box>
  );
};

export default StakingSection;
