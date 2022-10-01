import { Center, Flex, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { MainLayout } from "../../components/ui/MainLayout";
import { useAppDispatch, useAppSelector } from "../../hooks/core/useRedux";
import { fetchExistringPools } from "../../redux/asyncFuncs/poolsFuncs";
import { selectExistingPools } from "../../redux/slices/pools";
import PoolItem from "./PoolItem/PoolItem";
import Search from "./Search/Search";
const ViewPools = () => {
  const { data2: pools } = useAppSelector(selectExistingPools);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExistringPools());
  }, [dispatch]);
  return (
    <MainLayout metaTitle="View Pools">
      <Heading as={"h1"} w="full" textAlign={"center"} mt={10} mb={4}>
        Pools
      </Heading>
      <Center>
        <Search />
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
