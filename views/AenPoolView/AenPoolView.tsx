import { Flex, Heading } from "@chakra-ui/react";
import { addDays } from "date-fns";
import orderBy from "lodash/orderBy";
import { useEffect } from "react";
import { MainLayout } from "../../shared/components/ui/MainLayout";
import {
  useAppDispatch,
  useAppSelector,
} from "../../shared/hooks/core/useRedux";
import { fetchExistringPools } from "../../shared/redux/reduxAsyncFuncs/poolsFuncs";
import { fetchNfts } from "../../shared/redux/reduxAsyncFuncs/tokensFuncs";
import { selectExistingPools } from "../../shared/redux/slices/pools";
import { selectUserAddress } from "../../shared/redux/slices/settings";
import PoolItem from "../ViewPools/PoolItem/PoolItem";

const AenPoolView = () => {
  const { data: pools } = useAppSelector(selectExistingPools);
  const dispatch = useAppDispatch();
  const connectedAddress = useAppSelector(selectUserAddress);

  useEffect(() => {
    if (connectedAddress) {
      dispatch(fetchExistringPools());
      dispatch(fetchNfts(connectedAddress));
    }
  }, [dispatch, connectedAddress]);
  return (
    <MainLayout metaTitle="View Pools">
      <Heading as={"h1"} w="full" textAlign={"center"} mt={10} mb={4}>
        Pools
      </Heading>

      <Flex
        justifyContent={"center"}
        columnGap={5}
        rowGap="10"
        flexWrap="wrap"
        mt={10}
      >
        {orderBy(
          pools,
          [
            function (pool) {
              return Number(pool.nftsNow);
            },
          ],
          "asc"
        )
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
