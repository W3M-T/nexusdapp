import { Center, Heading, Text } from "@chakra-ui/react";
import { CardWrapper } from "../../../shared/components/ui/CardWrapper";
import SearchTable1 from "../../../shared/components/ui/SearchTable1";
import useNumerizePools from "../../../shared/hooks/tools/useNumerizePools";
import { columns } from "./columns";

const ExistingPools = () => {
  const { pools: data } = useNumerizePools();

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
