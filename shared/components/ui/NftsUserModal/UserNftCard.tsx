import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import useSWR from "swr";
import { getCollectionsCount } from "../../../services/rest/axiosEldron";
import { getNftData } from "../../../services/rest/elrondnftswap";
interface IProps {
  nft: {
    media?: any[];
    name: string;
    identifier: string;
    collection: string;
  };
}
const UserNftCard = ({ nft }: IProps) => {
  const { data: nftElrondSwap } = useSWR(nft && nft.identifier, getNftData);
  const { data: count } = useSWR(nft && nft.collection, getCollectionsCount);

  return (
    <Flex flexDir={"column"} bg={"black"} borderRadius="md">
      <Box key={nft.identifier}>
        <Box position="relative" borderRadius={"lg"} overflow="hidden">
          {nft.media && (
            <Image
              src={nft.media[0].thumbnailUrl}
              alt={nft.identifier}
              width="600px"
              height="600px"
              layout="responsive"
            />
          )}
        </Box>
        <Box px={3} mt={4}>
          <Text fontSize={"smaller"} mb={1}>
            {nft.identifier}
          </Text>
          <Flex justifyContent={"space-between"} alignItems="center" mb={1}>
            {" "}
            <Text fontSize={"xl"} mr={2}>
              {" "}
              {nft.name}
            </Text>{" "}
            {/* <IconNext
            src={twitterImg}
            width="24px"
            nextW="20.17px"
            nextH="16.45px"
          /> */}
          </Flex>
          <Flex justifyContent={"space-between"} mb={3}>
            {nftElrondSwap && (
              <Text fontSize={"smaller"} textDecoration="underline">
                Rank {nftElrondSwap?.rank}
              </Text>
            )}
            {nftElrondSwap && count && (
              <Text fontSize={"smaller"}>
                {nftElrondSwap?.rank} of {count}
              </Text>
            )}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default UserNftCard;
