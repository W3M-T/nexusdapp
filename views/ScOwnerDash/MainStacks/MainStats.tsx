import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { CardWrapper } from "../../../components/ui/CardWrapper";
import { useAppSelector } from "../../../hooks/core/useRedux";
import { selectPoolStats } from "../../../redux/slices/pools";
import { formatBalance } from "../../../utils/formatBalance";
import { formatTokenI } from "../../../utils/formatTokenIdentifier";

const MainStats = () => {
  const stats = useAppSelector(selectPoolStats);
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
              <Text key={fees.token}>
                {formatBalance({ balance: fees.amount })}{" "}
                {formatTokenI(fees.token)}
              </Text>
            );
          })}
        </Flex>
      </Box>
    </CardWrapper>
  );
};

export default MainStats;
