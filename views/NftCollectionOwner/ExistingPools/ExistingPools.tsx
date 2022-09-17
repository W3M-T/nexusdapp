import { Center, Heading, Text } from "@chakra-ui/react";
import { CardWrapper } from "../../../components/ui/CardWrapper";
import SearchTable1 from "../../../components/ui/SearchTable1";
import { columns } from "./columns";

const ExistingPools = () => {
  const data = [];

  return (
    <CardWrapper>
      <Heading fontSize={"2xl"}>Existing Pools</Heading>
      {data.length > 0 ? (
        <SearchTable1 tableData={[]} columnsData={columns} />
      ) : (
        <Center w="100%" mt="34px" mb="34px">
          <Text fontSize={"xl"}>No pools found</Text>
        </Center>
      )}
    </CardWrapper>
  );
};

export default ExistingPools;
