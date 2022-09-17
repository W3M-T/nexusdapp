import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { CardWrapper } from "../../../components/ui/CardWrapper";

const MainStats = () => {
  return (
    <CardWrapper>
      <Heading as="h3" fontSize="2xl" mb={8}>
        Dashboad
      </Heading>
      <Flex w="full" maxW="450px" justifyContent={"space-between"} mb={4}>
        <Text fontWeight={"semibold"}>Total Number of pools created</Text>
        <Text>32</Text>
      </Flex>
      <Flex w="full" maxW="450px" justifyContent={"space-between"} mb={4}>
        <Text fontWeight={"semibold"}>Total Number of nfts staked</Text>
        <Text>185</Text>
      </Flex>
      <Box w="full">
        <Text mb={2} fontWeight={"semibold"}>
          Total fees collected
        </Text>
        <Flex flexWrap={"wrap"} w="full" gap={3}>
          <Text>50 EGLD</Text>
          <Text>1200 WATER</Text>
          <Text>0 MERMAID</Text>
        </Flex>
      </Box>
    </CardWrapper>
  );
};

export default MainStats;
