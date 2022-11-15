import { Box } from "@chakra-ui/react";
import { MainLayout } from "../../shared/components/ui/MainLayout";
import MyNfts from "./MyNfts/MyNfts";

const Home = () => {
  return (
    <MainLayout metaTitle="Home">
      <Box mt={8}>
        <MyNfts />
      </Box>
    </MainLayout>
  );
};

export default Home;
