import { Box } from "@chakra-ui/react";
import { MainLayout } from "../../components/ui/MainLayout";
import LinkSection from "./LinkSection/LinkSection";

const Home = () => {
  return (
    <MainLayout metaTitle="Home">
      <Box mt={10}>
        <LinkSection />
      </Box>
    </MainLayout>
  );
};

export default Home;
