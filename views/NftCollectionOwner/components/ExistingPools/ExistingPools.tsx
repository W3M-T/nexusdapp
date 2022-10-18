import { Center, Heading, Text } from "@chakra-ui/react";
import { CardWrapper } from "../../../../shared/components/ui/CardWrapper";
import SearchTable1 from "../../../../shared/components/ui/SearchTable1";
import { useAppSelector } from "../../../../shared/hooks/core/useRedux";
import { selectExistingPools } from "../../../../shared/redux/slices/pools";
import { selectUserAddress } from "../../../../shared/redux/slices/settings";
import { columns } from "./columns";

const ExistingPools = () => {
  const { data } = useAppSelector(selectExistingPools);
  const address = useAppSelector(selectUserAddress);

  return (
    <CardWrapper>
      <Heading fontSize={"2xl"}>Existing Pools</Heading>
      {data.length !== 0 ? (
        <SearchTable1
          tableData={data.filter((pool) => pool.creator === address)}
          columnsData={columns}
        />
      ) : (
        <Center w="100%" mt="34px" mb="34px">
          <Text fontSize={"xl"}>No pools found</Text>
        </Center>
      )}
    </CardWrapper>
  );
};

export default ExistingPools;
