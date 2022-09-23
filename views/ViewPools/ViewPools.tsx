import { Center, Flex, Heading } from "@chakra-ui/react";
import { MainLayout } from "../../components/ui/MainLayout";
import SearchBar from "../../components/ui/SearchBar";
import { useAppSelector } from "../../hooks/core/useRedux";
import { selectExistingPools } from "../../redux/slices/pools";
import PoolItem from "./PoolItem/PoolItem";

const ViewPools = () => {
  const { data: pools } = useAppSelector(selectExistingPools);

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
        {pools.map((pool, i) => {
          return <PoolItem key={i} pool={pool} />;
        })}
      </Flex>
    </MainLayout>
  );
};

export default ViewPools;
