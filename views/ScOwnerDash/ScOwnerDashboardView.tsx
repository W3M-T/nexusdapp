import { Flex, Grid } from "@chakra-ui/react";
import { MainLayout } from "../../components/ui/MainLayout";
import { route } from "../../utils/routes";
import Actions from "./Actions/Actions";
import ExistingPools from "./ExistingPools/ExistingPools";
import MainStats from "./MainStacks/MainStats";

const ScOwnerDashboardView = () => {
  return (
    <MainLayout metaTitle={route.scOwner.name}>
      <Grid templateColumns={"1fr 1fr"} gap={10}>
        <Flex flexDir={"column"} gap={10}>
          <MainStats />
          <ExistingPools />
        </Flex>
        <Actions />
      </Grid>
    </MainLayout>
  );
};

export default ScOwnerDashboardView;
