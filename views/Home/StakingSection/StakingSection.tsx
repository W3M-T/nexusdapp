import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import { useAppSelector } from "../../../hooks/core/useRedux";
import { selectUserStaked } from "../../../redux/slices/pools";
import NFTCard from "./NFTCard/NFTCard";

const StakingSection = () => {
  const stakedNfts = useAppSelector(selectUserStaked);
  return (
    <Box>
      <Center w="full">
        <Heading fontSize={"3xl"} borderBottom="3px solid white">
          Staked NFTs
        </Heading>
      </Center>
      <Flex
        justifyContent={"center"}
        columnGap={5}
        rowGap="10"
        flexWrap="wrap"
        mt={10}
      >
        {stakedNfts.data.map((nft) => {
          return <NFTCard nft={nft} key={nft.nonce} />;
        })}
      </Flex>
    </Box>
  );
};

export default StakingSection;
