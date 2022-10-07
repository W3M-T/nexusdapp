import { Box, Flex, Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { MainLayout } from "../../shared/components/ui/MainLayout";
import { useAppDispatch } from "../../shared/hooks/core/useRedux";
import {
  fetchAllowedRegistrationTokens,
  fetchAllowedRewardTokens,
  fetchExistringPools,
  fetchNonWithdrawnCollections,
  fetchStats,
} from "../../shared/redux/reduxAsyncFuncs/poolsFuncs";
import { route } from "../../shared/utils/routes";
import Actions from "./Actions/Actions";
import ExistingPools from "./ExistingPools/ExistingPools";
import MainStats from "./MainStacks/MainStats";

const ScOwnerDashboardView = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchStats());
    dispatch(fetchExistringPools());
    dispatch(fetchNonWithdrawnCollections());
    dispatch(fetchAllowedRegistrationTokens());
    dispatch(fetchAllowedRewardTokens());
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
