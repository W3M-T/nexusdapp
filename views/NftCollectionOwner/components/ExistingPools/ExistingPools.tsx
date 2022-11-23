import { Center, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CardWrapper } from "../../../../shared/components/ui/CardWrapper";
import SearchTable1 from "../../../../shared/components/ui/SearchTable1";
import { useAppSelector } from "../../../../shared/hooks/core/useRedux";
import useGroupByField from "../../../../shared/hooks/tools/useGroupByField";
import { selectExistingPools } from "../../../../shared/redux/slices/pools";
import { selectUserAddress } from "../../../../shared/redux/slices/settings";
import { IExistingPool } from "../../../../shared/redux/types/pools.interface";
import { columns } from "./columns";

const ExistingPools = () => {
  const { data } = useAppSelector(selectExistingPools);
  const address = useAppSelector(selectUserAddress);
  const [poolData, setPoolData] = useState([]);

  const poolsGroupedByCollection: IExistingPool[][] = useGroupByField(
    data.filter((pool) => pool.creator === address),
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

  return (
    <CardWrapper>
      <Heading fontSize={"2xl"}>Existing Pools</Heading>
      {poolData.length !== 0 ? (
        <SearchTable1 tableData={poolData} columnsData={columns} />
      ) : (
        <Center w="100%" mt="34px" mb="34px">
          <Text fontSize={"xl"}>No pools found</Text>
        </Center>
      )}
    </CardWrapper>
  );
};

export default ExistingPools;
