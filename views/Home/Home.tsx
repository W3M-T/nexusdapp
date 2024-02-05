import { Center, Flex, Heading } from "@chakra-ui/react";
import "swiper/css";
import { Authenticated } from "../../shared/components/tools/Authenticated";
import { MainLayout } from "../../shared/components/ui/MainLayout";
import MyNfts from "./MyNfts/MyNfts";
import Pools from "./Pools/Pools";
import StakedNfts from "./StakedNfts/StakedNfts";
import SwapView from "./SwapView/SwapView";

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
          <StakedNfts />
          <Pools />
        </Flex>
      {/* </Authenticated> */}
    </MainLayout>
  );
};

export default Home;
