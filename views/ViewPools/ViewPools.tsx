import { Center, Flex, Heading } from "@chakra-ui/react";
import { MainLayout } from "../../components/ui/MainLayout";
import SearchBar from "../../components/ui/SearchBar";
import PoolItem from "./PoolItem/PoolItem";

const ViewPools = () => {
  return (
    <MainLayout metaTitle="View Pools">
      <Heading as={"h1"} w="full" textAlign={"center"} mt={10} mb={4}>
        Pools
      </Heading>
      <Center>
        <SearchBar w="full" maxWidth={"400px"} />
      </Center>
      <Flex
        justifyContent={"center"}
        columnGap={5}
        rowGap="10"
        flexWrap="wrap"
        mt={10}
      >
        <PoolItem />
        <PoolItem />
        <PoolItem />
        <PoolItem />
      </Flex>
    </MainLayout>
  );
};

export default ViewPools;
