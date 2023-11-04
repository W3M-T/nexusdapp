import {
  Box,
  Flex,
  HStack,
  Heading,
  SkeletonCircle,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { SwiperSlide } from "swiper/react";
// Import Swiper styles
import dynamic from "next/dynamic";
import Image from "next/image";
import { Fragment } from "react";
import { breakpoints } from "../../../config/chakraTheme";
import { SwipperS } from "../../../shared/components/ui/SwiperS";
import useGetNfts from "../../../shared/hooks/tools/useGetNfts";
import { noShowMedia } from "../../../shared/utils/excludeNft";
import { CardWrapper } from "../../../shared/components/ui/CardWrapper";
import { ActionButton } from "../../../shared/components/tools/ActionButton";
import { ViewButton } from "../../../shared/components/tools/ViewButton";

const NftsUserModal = dynamic(
  () => import("../../../shared/components/ui/NftsUserModal/NftsUserModal")
);

const MyNfts = () => {
  const data = useGetNfts();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThanLg] = useMediaQuery(`(min-width: ${breakpoints.lg})`);
  let poolItems = 4;

  if (isLargerThanLg) {
    poolItems = 8;
  }

  if (data && data.length === 0) {
    return null;
  }
  return (
    <CardWrapper>
      <Flex flexDir={"column"}>
          <HStack justifyContent="center" alignContent={"center"} mb={8}>
            <Heading
              fontWeight="700"
              as="h2"
              fontSize={"24px"}
              w="full"
              // color="dappTemplate.color2.base"
              cursor={!isLargerThanLg && "pointer"}
              onClick={!isLargerThanLg && onOpen}
            >
              My NFTs
            </Heading>
            {poolItems < data?.length && (
              <ViewButton w={"160px"} fontSize={"14px"} cursor="pointer" _hover={{ fontWeight: "bold" }} onClick={onOpen}>
                View all
              </ViewButton>
            )}
          </HStack>
        <SwipperS slidesPerView={poolItems}>
          {!data ? (
            <Fragment>
              <SwiperSlide>
                <SkeletonCircle boxSize={{ sm: "65px", md: "100px" }} />
              </SwiperSlide>

              <SwiperSlide>
                <SkeletonCircle boxSize={{ sm: "65px", md: "100px" }} />
              </SwiperSlide>

              <SwiperSlide>
                <SkeletonCircle boxSize={{ sm: "65px", md: "100px" }} />
              </SwiperSlide>

              <SwiperSlide>
                <SkeletonCircle boxSize={{ sm: "65px", md: "100px" }} />
              </SwiperSlide>
              <SwiperSlide>
                <SkeletonCircle boxSize={{ sm: "65px", md: "100px" }} />
              </SwiperSlide>
              <SwiperSlide>
                <SkeletonCircle boxSize={{ sm: "65px", md: "100px" }} />
              </SwiperSlide>
              <SwiperSlide>
                <SkeletonCircle boxSize={{ sm: "65px", md: "100px" }} />
              </SwiperSlide>
              <SwiperSlide>
                <SkeletonCircle boxSize={{ sm: "65px", md: "100px" }} />
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
                          boxSize={{ sm: "65px", md: "100px" }}
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
                              width={600}
                              height={600}
                            />
                          )}
                        </Box>
                        <Box fontSize={{ sm: "10px", md: "11px" }}>
                          {nft.name}
                        </Box>
                      </Flex>
                    </SwiperSlide>
                  );
                })}
            </Fragment>
          )}
        </SwipperS>
        {isOpen && <NftsUserModal onClose={onClose} isOpen={isOpen} />}
      </Flex>
    </CardWrapper>
  );
};

export default MyNfts;
