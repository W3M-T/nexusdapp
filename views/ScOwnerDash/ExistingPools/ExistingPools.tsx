import { Center, Heading, Text } from "@chakra-ui/react";
import { CardWrapper } from "../../../shared/components/ui/CardWrapper";
import SearchTable1 from "../../../shared/components/ui/SearchTable1";
import { useAppSelector } from "../../../shared/hooks/core/useRedux";
import { selectExistingPools } from "../../../shared/slices/pools";
import { columns } from "./columns";

const ExistingPools = () => {
  const { data } = useAppSelector(selectExistingPools);

  return (
    <CardWrapper overflowX="auto">
      <Heading fontSize={"2xl"}>Existing Pools</Heading>
      {data.length !== 0 ? (
        <SearchTable1 tableData={data} columnsData={columns} />
      ) : (
        <Center w="100%" mt="34px" mb="34px">
          <Text fontSize={"xl"}>No pools found</Text>
        </Center>
      )}
    </CardWrapper>
  );
};

export default ExistingPools;
