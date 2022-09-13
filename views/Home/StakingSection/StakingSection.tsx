import { Box, Flex, Heading } from "@chakra-ui/react";
import NFTCard from "./NFTCard/NFTCard";

const StakingSection = () => {
  return (
    <Box>
      <Heading fontSize={"3xl"}>Staked NFT</Heading>
      <Flex
        justifyContent={"center"}
        columnGap={5}
        rowGap="10"
        flexWrap="wrap"
        mt={10}
      >
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
      </Flex>
    </Box>
  );
};

export default StakingSection;
