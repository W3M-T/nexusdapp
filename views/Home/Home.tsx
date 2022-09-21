import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { MainLayout } from "../../components/ui/MainLayout";
import { useAppDispatch, useAppSelector } from "../../hooks/core/useRedux";
import { fetchUserStaked } from "../../redux/asyncFuncs/poolsFuncs";
import { selectUserAddress } from "../../redux/slices/settings";
import LinkSection from "./LinkSection/LinkSection";
import StakingSection from "./StakingSection/StakingSection";

const Home = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);

  useEffect(() => {
    dispatch(fetchUserStaked(address));
  }, [address, dispatch]);
  return (
    <MainLayout metaTitle="Home">
      <Box mt={24} mb={32}>
        <LinkSection />
      </Box>
      <Box>
        <StakingSection />
      </Box>
    </MainLayout>
  );
};

export default Home;
