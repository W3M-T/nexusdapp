import { Box, Flex, Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { MainLayout } from "../../components/ui/MainLayout";
import { useAppDispatch } from "../../hooks/core/useRedux";
import {
  fetchExistringPools,
  fetchNonWithdrawnCollections,
  fetchStats,
} from "../../redux/asyncFuncs/poolsFuncs";
import { route } from "../../utils/routes";
import Actions from "./Actions/Actions";
import ExistingPools from "./ExistingPools/ExistingPools";
import MainStats from "./MainStacks/MainStats";

const ScOwnerDashboardView = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchStats());
    dispatch(fetchExistringPools());
    dispatch(fetchNonWithdrawnCollections());
  }, [dispatch]);
  return (
    <MainLayout metaTitle={route.scOwner.name}>
      <Grid templateColumns={{ sm: "1fr", xl: "1fr 1fr" }} gap={10} w="full">
        <Flex flexDir={"column"} gap={10} overflowX={"auto"}>
          <MainStats />
          <Box>
            <ExistingPools />
          </Box>
        </Flex>
        <Actions />
      </Grid>
    </MainLayout>
  );
};

export default ScOwnerDashboardView;
