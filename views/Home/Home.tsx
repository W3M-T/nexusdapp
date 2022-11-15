import { Box } from "@chakra-ui/react";
import { MainLayout } from "../../shared/components/ui/MainLayout";

const Home = () => {
  return (
    <MainLayout metaTitle="Home">
      <Box mt={8}>
        <h1>Home</h1>
      </Box>
    </MainLayout>
  );
};

export default Home;
