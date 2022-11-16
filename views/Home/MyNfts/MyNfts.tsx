import {
  Box,
  Flex,
  Heading,
  SkeletonCircle,
  useMediaQuery,
} from "@chakra-ui/react";
import { SwiperSlide } from "swiper/react";
// Import Swiper styles
import Image from "next/image";
import { Fragment } from "react";
import useSWR from "swr";
import { breakpoints } from "../../../config/chakraTheme";
import { SwipperS } from "../../../shared/components/ui/SwiperS";
import { useAppSelector } from "../../../shared/hooks/core/useRedux";
import { selectUserAddress } from "../../../shared/redux/slices/settings";
import { INft } from "../../../shared/redux/types/tokens.interface";
import { swrFetcher } from "../../../shared/services/rest/axiosEldron";
import { noShowMedia } from "../../../shared/utils/excludeNft";
const MyNfts = () => {
  const address = useAppSelector(selectUserAddress);
  const { data } = useSWR<INft[]>(
    address && `/accounts/${address}/nfts`,
    swrFetcher
  );

  const [isLargerThanLg] = useMediaQuery(`(min-width: ${breakpoints.lg})`);
  const [isLargerThanTablet] = useMediaQuery(`(min-width: ${breakpoints.lsm})`);

  let poolItems = 5;
  if (isLargerThanTablet) {
    poolItems = 6;
  }
  if (isLargerThanLg) {
    poolItems = 8;
  }

  if (data && data.length === 0) {
    return null;
  }
  return (
    <Flex flexDir={"column"}>
      {" "}
      <Heading
        mb={4}
        fontWeight="600"
        as="h2"
        fontSize={"24px"}
        color="dappTemplate.color2.base"
      >
        My NFTs
      </Heading>
      <SwipperS
        slidesPerView={poolItems}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {!data ? (
          <Fragment>
            <SwiperSlide>
              <SkeletonCircle boxSize={{ sm: "40px", md: "100px" }} />
            </SwiperSlide>

            <SwiperSlide>
              <SkeletonCircle boxSize={{ sm: "40px", md: "100px" }} />
            </SwiperSlide>

            <SwiperSlide>
              <SkeletonCircle boxSize={{ sm: "40px", md: "100px" }} />
            </SwiperSlide>

            <SwiperSlide>
              <SkeletonCircle boxSize={{ sm: "40px", md: "100px" }} />
            </SwiperSlide>

            <SwiperSlide>
              <SkeletonCircle boxSize={{ sm: "40px", md: "100px" }} />
            </SwiperSlide>
          </Fragment>
        ) : (
          <Fragment>
            {data
              .filter((nft) => !noShowMedia(nft))
              .map((nft) => {
                return (
                  <SwiperSlide key={nft.identifier}>
                    <Flex
                      w="full"
                      justifyContent={"center"}
                      alignItems="center"
                      flexDir={"column"}
                      cursor="pointer"
                    >
                      <Box
                        boxSize={{ sm: "40px", md: "100px" }}
                        borderRadius={"full"}
                        position="relative"
                        overflow={"hidden"}
                        mb={3}
                        bg="#ffffff21"
                      >
                        {nft.media && (
                          <Image
                            src={nft.media[0].thumbnailUrl}
                            alt={nft.name}
                            layout="responsive"
                            width={"600px"}
                            height="600px"
                          />
                        )}
                      </Box>
                      <Box fontSize={{ sm: "7px", md: "11px" }}>{nft.name}</Box>
                    </Flex>
                  </SwiperSlide>
                );
              })}
          </Fragment>
        )}
      </SwipperS>
      <Flex
        w="full"
        justifyContent={"flex-end"}
        display={{ sm: "none", md: "flex" }}
      >
        <Box cursor="pointer" _hover={{ fontWeight: "bold" }}>
          View all
        </Box>
      </Flex>
    </Flex>
  );
};

export default MyNfts;
