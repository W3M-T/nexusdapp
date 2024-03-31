import { Center, Flex, Heading } from "@chakra-ui/react";
import "swiper/css";
import { Authenticated } from "../../shared/components/tools/Authenticated";
import { MainLayout } from "../../shared/components/ui/MainLayout";
import MyNfts from "./MyNfts/MyNfts";
import Pools from "./Pools/Pools";
import StakedNfts from "./Dashboard/StakedNfts/StakedNfts";
import SwapView from "./SwapView/SwapView";
import Dashboard from "./Dashboard/Dashboard";

const Home = () => {
  return (
    <MainLayout metaTitle="Home">
      {/* <Authenticated
        fallback={
          <Center mt="120px">
            {" "}
            <Heading as="h1">
              Connect your wallet to view your staked NFTs!
            </Heading>
          </Center>
        }
      > */}
        <Flex mt={6} flexDir="column" gap={{sm: 0, md: 2}}>
          <SwapView/>
          <MyNfts />
          <Dashboard />
          <Pools />
        </Flex>
      {/* </Authenticated> */}
    </MainLayout>
  );
};

export default Home;
