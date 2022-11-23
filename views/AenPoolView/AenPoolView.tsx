import { Flex, Heading } from "@chakra-ui/react";
import { addDays } from "date-fns";
import orderBy from "lodash/orderBy";
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
  fetcHhasStakedForAEN,
  fetchUserStaked,
} from "../../shared/redux/reduxAsyncFuncs/poolsFuncs";
import { fetchNfts } from "../../shared/redux/reduxAsyncFuncs/tokensFuncs";
import { selectExistingPools } from "../../shared/redux/slices/pools";
import { selectUserAddress } from "../../shared/redux/slices/settings";
import { IExistingPool } from "../../shared/redux/types/pools.interface";
import { route } from "../../shared/utils/routes";

const AenPoolView = () => {
  const { data: pools } = useAppSelector(selectExistingPools);
  const dispatch = useAppDispatch();
  const connectedAddress = useAppSelector(selectUserAddress);

  const [poolData, setPoolData] = useState([]);
  const poolsGroupedByCollection: IExistingPool[][] = useGroupByField(
    pools,
    "collection"
  );

  useEffect(() => {
    dispatch(fetchExistringPools());
    if (connectedAddress) {
      dispatch(fetchUserStaked({ address: connectedAddress, page: 0 }));
      dispatch(fetcHhasStakedForAEN(connectedAddress));
      dispatch(fetchNfts(connectedAddress));
    }
  }, [dispatch, connectedAddress]);

  useEffect(() => {
    const newPoolsCollections = [...poolsGroupedByCollection];

    const colelctionsPools = newPoolsCollections.flatMap((collectionPool) => {
      const newPools = orderBy(
        collectionPool,
        [
          function (pool) {
            return Number(pool.nftsNow);
          },
        ],
        "asc"
      ).map((pool, i) => {
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
    <MainLayout metaTitle={route.aenPools.name}>
      <Heading as={"h1"} w="full" textAlign={"center"} mt={10} mb={4}>
        AEN Pools
      </Heading>

      <Flex
        justifyContent={"center"}
        columnGap={5}
        rowGap="10"
        flexWrap="wrap"
        mt={10}
      >
        {poolData
          .filter((p) => {
            const date = new Date(p.timestam * 1000);

            const dateInAMonth = addDays(date, 30);
            const today = new Date();

            if (dateInAMonth < today || p.collection !== "") {
              return false;
            } else {
              return true;
            }
          })
          .map((pool, i) => {
            return <PoolItem key={i} pool={pool} />;
          })}
      </Flex>
    </MainLayout>
  );
};

export default AenPoolView;
