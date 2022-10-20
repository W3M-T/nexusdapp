import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { MainLayout } from "../../shared/components/ui/MainLayout";
import {
  useAppDispatch,
  useAppSelector,
} from "../../shared/hooks/core/useRedux";
import { fetchUserStaked } from "../../shared/redux/reduxAsyncFuncs/poolsFuncs";
import { selectUserStaked } from "../../shared/redux/slices/pools";
import { selectUserAddress } from "../../shared/redux/slices/settings";
import StakingSection from "./StakingSection/StakingSection";

const Home = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);
  const page = useAppSelector(selectUserStaked).page;
  useEffect(() => {
    dispatch(fetchUserStaked({ address: address, page: page }));
  }, [address, dispatch, page]);
  return (
    <MainLayout metaTitle="Home">
      <Box mt={8}>
        <StakingSection />
      </Box>
    </MainLayout>
  );
};

export default Home;
