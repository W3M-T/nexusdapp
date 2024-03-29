import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import { orderBy } from "lodash";
import { useEffect, useState } from "react";
import { MainLayout } from "../../shared/components/ui/MainLayout";
import PoolItem from "../../shared/components/ui/PoolItem";
import {
  useAppDispatch,
  useAppSelector,
} from "../../shared/hooks/core/useRedux";
import useGroupByField from "../../shared/hooks/tools/useGroupByField";
import {
  fetchExistringPools,
  fetchNeedsToUnstake,
  fetchUserStaked,
} from "../../shared/redux/reduxAsyncFuncs/poolsFuncs";
import { fetchNfts } from "../../shared/redux/reduxAsyncFuncs/tokensFuncs";
import { selectExistingPools } from "../../shared/redux/slices/pools";
import { selectUserAddress } from "../../shared/redux/slices/settings";
import { IExistingPool } from "../../shared/redux/types/pools.interface";
import Search from "./Search/Search";
import { CardWrapper } from "../../shared/components/ui/CardWrapper";

const ViewPools = () => {
  const { data4: pools } = useAppSelector(selectExistingPools);
  const connectedAddress = useAppSelector(selectUserAddress);
  const [poolData, setPoolData] = useState([]);

  const poolsGroupedByCollection: IExistingPool[][] = useGroupByField(
    pools,
    "collection"
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExistringPools());
    if (connectedAddress) {
      dispatch(fetchNfts(connectedAddress));
      dispatch(fetchNeedsToUnstake(connectedAddress));
      dispatch(fetchUserStaked({ address: connectedAddress, page: 0 }));
    }
  }, [dispatch, connectedAddress]);

  useEffect(() => {
    const newPoolsCollections = [...poolsGroupedByCollection];

    const colelctionsPools = newPoolsCollections.flatMap((collectionPool) => {
      const newPools = collectionPool.map((pool, i) => {
        if (collectionPool.length > 1) {
          if (i === 0) {
            return pool;
          } else {
            const data: IExistingPool = {
              ...pool,
              poolName: pool.poolName + " " + (i + 1),
            };
            return data;
          }
        } else {
          return pool;
        }
      });
      return newPools;
    });
    setPoolData(colelctionsPools);
  }, [poolsGroupedByCollection]);

  return (
    <CardWrapper>
      <Heading as={"h1"} w="full" textAlign={"center"} mb={4}>
        Pools
      </Heading>
      <Center>
        <Search />
      </Center>
      <Flex
        justifyContent={"center"}
        gap={5}
        flexWrap="wrap"
        mt={10}
      >
        {orderBy(
          poolData,
          [
            function (pool) {
              return pool.timestam;
            },
          ],
          "desc"
        ).map((pool, i) => {
          return <PoolItem key={i} pool={pool} />;
        })}
      </Flex>
    </CardWrapper>
  );
};

export default ViewPools;
