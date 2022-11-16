import { Flex } from "@chakra-ui/react";
import "swiper/css";
import { MainLayout } from "../../shared/components/ui/MainLayout";
import MyNfts from "./MyNfts/MyNfts";
import Pools from "./Pools/Pools";
import StakedNfts from "./StakedNfts/StakedNfts";

const Home = () => {
  return (
    <MainLayout metaTitle="Home">
      <Flex mt={8} flexDir="column" gap="40px">
        <MyNfts />
        <StakedNfts />
        <Pools />
      </Flex>
    </MainLayout>
  );
};

export default Home;
