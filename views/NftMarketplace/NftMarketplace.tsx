import { Box, Center, Flex, Heading, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { MainLayout } from "../../shared/components/ui/MainLayout";
import {
  useAppDispatch,
  useAppSelector,
} from "../../shared/hooks/core/useRedux";
import {
  fetchHasReadWarning,
  fetchUserStaked,
} from "../../shared/redux/reduxAsyncFuncs/poolsFuncs";
import { selectUserStaked } from "../../shared/redux/slices/pools";
import { selectUserAddress } from "../../shared/redux/slices/settings";
import { orderBy } from "lodash";
import { CardWrapper } from "../../shared/components/ui/CardWrapper";
import PoolItem from "../../shared/components/ui/PoolItem";
import Search from "./Search";
import { customColors } from "../../config/chakraTheme";

const NftMarketplace = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);
  // const page = useAppSelector(selectUserStaked).page;
  // useEffect(() => {
  //   if (address) {
  //     dispatch(fetchHasReadWarning(address));
  //     dispatch(fetchUserStaked({ address: address, page: page, maxNftsPerPage: 8 }));
  //   }
  // }, [address, dispatch, page]);


  return (
    <MainLayout metaTitle="NFT Marketplace">
      <CardWrapper
        mx={0}
        px={0}
        pb={0}
      >
        <Heading as={"h1"} w="full" textAlign={"center"} mb={6}>
          NFT Marketplace
        </Heading>
        <HStack justifyContent={"space-between"} px={4}>
          <Search/>
          <Search/>
        </HStack>
        <Flex
          justifyContent={"center"}
          gap={5}
          flexWrap="wrap"
          mt={10}
          bg={customColors.myCustomColor.base}
          borderRadius={"2xl"}
        >
          {/* {orderBy(
            poolData,
            [
              function (pool) {
                return pool.timestam;
              },
            ],
            "desc"
          ).map((pool, i) => {
            return <PoolItem key={i} pool={pool} />;
          })} */}
        </Flex>
      </CardWrapper>
    </MainLayout>
  );
};

export default NftMarketplace;