import { Box } from "@chakra-ui/react";
import { MainLayout } from "../../components/ui/MainLayout";
import LinkSection from "./LinkSection/LinkSection";
import StakingSection from "./StakingSection/StakingSection";

const Home = () => {
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
