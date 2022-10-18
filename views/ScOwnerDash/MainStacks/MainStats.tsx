import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { CardWrapper } from "../../../shared/components/ui/CardWrapper";
import { useAppSelector } from "../../../shared/hooks/core/useRedux";
import { selectPoolStats } from "../../../shared/redux/slices/pools";
import { formatBalance } from "../../../shared/utils/formatBalance";
import { formatTokenI } from "../../../shared/utils/formatTokenIdentifier";

const MainStats = () => {
  const stats = useAppSelector(selectPoolStats);
  console.log(stats);

  return (
    <CardWrapper>
      <Heading as="h3" fontSize="2xl" mb={8}>
        Dashboad
      </Heading>
      <Flex w="full" maxW="450px" justifyContent={"space-between"} mb={4}>
        <Text fontSize="lg" fontWeight={"semibold"}>
          Total Number of pools created
        </Text>
        <Text>{stats.data.poolsCreated}</Text>
      </Flex>
      <Flex w="full" maxW="450px" justifyContent={"space-between"} mb={4}>
        <Text fontSize="lg" fontWeight={"semibold"}>
          Total Number of NFTs staked
        </Text>
        <Text>{stats.data.nftStaked}</Text>
      </Flex>
      <Box w="full">
        <Text fontSize="lg" mb={2} fontWeight={"semibold"}>
          Total fees collected
        </Text>
        <Flex flexWrap={"wrap"} w="full" gap={3}>
          {stats.data.feesCollected.map((fees) => {
            return (
              <Flex key={fees.token} alignItems="center">
                <Text>
                  {formatBalance({ balance: fees.amount })}{" "}
                  {formatTokenI(fees.token)}
                </Text>
                {(fees.tokenDetials.assets?.svgUrl ||
                  fees.tokenDetials.assets?.staticSrc) && (
                  <Box boxSize={4} ml={1}>
                    <Box borderRadius={"full"} boxSize={4}>
                      <Image
                        layout="intrinsic"
                        width="30px"
                        height="30px"
                        src={
                          fees.tokenDetials.assets.svgUrl ||
                          fees.tokenDetials.assets.staticSrc ||
                          ""
                        }
                        alt={fees.tokenDetials.name}
                      />
                    </Box>
                  </Box>
                )}
              </Flex>
            );
          })}
        </Flex>
      </Box>
    </CardWrapper>
  );
};

export default MainStats;
