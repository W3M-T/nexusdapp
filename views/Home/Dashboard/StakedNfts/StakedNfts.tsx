import {
  Box,
  Flex,
  HStack,
  Heading,
  Skeleton,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { addDays } from "date-fns";
import orderBy from "lodash/orderBy";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { breakpoints } from "../../../../config/chakraTheme";
import { SwipperS } from "../../../../shared/components/ui/SwiperS";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/core/useRedux";
import { fetchUserStaked } from "../../../../shared/redux/reduxAsyncFuncs/poolsFuncs";
import { selectUserStaked } from "../../../../shared/redux/slices/pools";
import { selectUserAddress } from "../../../../shared/redux/slices/settings";
import { route } from "../../../../shared/utils/routes";
import NFTCard from "../../../Staked/StakingSection/NFTCard/NFTCard";
import NftModal from "../../../Staked/StakingSection/NftModal/NftModal";
import { CardWrapper } from "../../../../shared/components/ui/CardWrapper";
import { ViewButton } from "../../../../shared/components/tools/ViewButton";

const StakedNfts = () => {
  const dispatch = useAppDispatch();
  const stakedNfts = useAppSelector(selectUserStaked);

  const address = useAppSelector(selectUserAddress);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNft, setSelectedNft] = useState(null);
  const [isLargerThanLg] = useMediaQuery(`(min-width: ${breakpoints.lg})`);
  const [isLargerThanTablet] = useMediaQuery(`(min-width: ${breakpoints.lsm})`);

  const handleViwNft = (nft) => {
    setSelectedNft(nft);
    onOpen();
  };
  let poolItems = 3;
  if (isLargerThanTablet) {
    poolItems = 4;
  }
  if (isLargerThanLg) {
    poolItems = 5;
  }

  useEffect(() => {
    if (address) {
      dispatch(fetchUserStaked({ address: address, page: 1 }));
    }
  }, [address, dispatch]);

  if (stakedNfts.data.nfts.length === 0) {
    return null;
  }

  return (
    <CardWrapper w={"full"}>
      <Flex flexDir={"column"}>
        <HStack justifyContent="center" alignContent={"center"} mb={8}>
          <Heading
            // color="dappTemplate.color2.base"
            fontWeight="700"
            as="h2"
            fontSize={"24px"}
            w="full"
          >
            {isLargerThanLg ? (
              "Staked NFTs"
            ) : (
              <Link href={route.staked.route}>Staked NFTs</Link>
            )}
          </Heading>
          <ViewButton w={"100px"} fontSize={"12px"} cursor="pointer" _hover={{ fontWeight: "bold" }} >
            <Link href={route.staked.route}>
              View all
            </Link>
          </ViewButton>
        </HStack>

        {isOpen && (
          <NftModal isOpen={isOpen} onClose={onClose} nft={selectedNft} />
        )}

        <SwipperS
          slidesPerView={poolItems}
          // spaceBetween={"auto"}
        >
          {stakedNfts.status === "loading" ? (
            <Fragment>
              <SwiperSlide>
                <Box w="80%">
                  <Skeleton
                    w="100%"
                    h={"clamp(80px, 12vw, 200px)"}
                    borderRadius={{ sm: "15px", md: "35px" }}
                  />
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box w="80%">
                  <Skeleton
                    w="100%"
                    h={"clamp(80px, 12vw, 200px)"}
                    borderRadius={{ sm: "15px", md: "35px" }}
                  />
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box w="80%">
                  <Skeleton
                    w="100%"
                    h={"clamp(80px, 12vw, 200px)"}
                    borderRadius={{ sm: "15px", md: "35px" }}
                  />
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box w="80%">
                  <Skeleton
                    w="100%"
                    h={"clamp(80px, 12vw, 200px)"}
                    borderRadius={{ sm: "15px", md: "35px" }}
                  />
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box w="80%">
                  <Skeleton
                    w="100%"
                    h={"clamp(80px, 12vw, 200px)"}
                    borderRadius={{ sm: "15px", md: "35px" }}
                  />
                </Box>
              </SwiperSlide>
            </Fragment>
          ) : (
            <Fragment>
              {orderBy(
                stakedNfts.data.nfts,
                [
                  function (pool) {
                    return addDays(
                      new Date(pool.nftPool.timestam * 1000),
                      pool.nftPool.poolDuration
                    ).getTime();
                  },
                ],
                "asc"
              ).map((nft, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Box width="full">
                      <NFTCard
                        nft={nft}
                        onClick={() => handleViwNft(nft)}
                        wrapperProps={{
                          borderRadius: { sm: "15px", md: "30px" },
                          p: {
                            sm: "5px",
                            md: "10px",
                          },
                        }}
                        fromHome
                      />
                    </Box>
                  </SwiperSlide>
                );
              })}
            </Fragment>
          )}
        </SwipperS>
      </Flex>
    </CardWrapper>
  );
};

export default StakedNfts;
