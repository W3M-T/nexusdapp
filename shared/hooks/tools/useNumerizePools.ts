import { useEffect, useState } from "react";
import { selectExistingPools } from "../../redux/slices/pools";
import { selectUserAddress } from "../../redux/slices/settings";
import { IExistingPool } from "../../redux/types/pools.interface";
import { useAppSelector } from "../core/useRedux";
import useGroupByField from "./useGroupByField";

const useNumerizePools = () => {
  const address = useAppSelector(selectUserAddress);
  const [poolData, setPoolData] = useState([]);
  const { data } = useAppSelector(selectExistingPools);

  const poolsGroupedByCollection: IExistingPool[][] = useGroupByField(
    data,
    "collection"
  );

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

  return {
    pools: poolData,
    poolsByAddress: poolData.filter((pool) => pool.creator === address),
  };
};

export default useNumerizePools;
