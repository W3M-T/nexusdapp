import { Box, Flex, Heading, SkeletonCircle } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import styled from "@emotion/styled";
import Image from "next/image";
import { Fragment } from "react";
import "swiper/css";
import useSWR from "swr";
import { useAppSelector } from "../../../shared/hooks/core/useRedux";
import { selectUserAddress } from "../../../shared/redux/slices/settings";
import { INft } from "../../../shared/redux/types/tokens.interface";
import { swrFetcher } from "../../../shared/services/rest/axiosEldron";
const MyNfts = () => {
  const address = useAppSelector(selectUserAddress);
  const { data, error } = useSWR<INft[]>(
    address && `/accounts/${address}/nfts`,
    swrFetcher
  );

  console.log("data", data);

  return (
    <Flex flexDir={"column"}>
      {" "}
      <Heading
        mb={8}
        fontWeight="600"
        as="h2"
        fontSize={"24px"}
        color="dappTemplate.color2.base"
      >
        My NFTs
      </Heading>
      <SwipperS
        slidesPerView={5}
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
            {data.map((nft) => {
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
                    <Box fontSize={{ sm: "6px", md: "sm" }}>{nft.name}</Box>
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

const SwipperS = styled(Swiper)`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 18px;

  .swiper-slide {
    text-align: center;
    font-size: 18px;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-slide {
    width: 80%;
  }

  .swiper-slide:nth-child(2n) {
    width: 60%;
  }

  .swiper-slide:nth-child(3n) {
    width: 40%;
  }
`;
