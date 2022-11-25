import {
  Box,
  Flex,
  Heading,
  Skeleton,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { breakpoints } from "../../../config/chakraTheme";
import { SwipperS } from "../../../shared/components/ui/SwiperS";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/hooks/core/useRedux";
import { fetchUserStaked } from "../../../shared/redux/reduxAsyncFuncs/poolsFuncs";
import { selectUserStaked } from "../../../shared/redux/slices/pools";
import { selectUserAddress } from "../../../shared/redux/slices/settings";
import { route } from "../../../shared/utils/routes";
import NFTCard from "../../Staked/StakingSection/NFTCard/NFTCard";
import NftModal from "../../Staked/StakingSection/NftModal/NftModal";

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
      dispatch(fetchUserStaked({ address: address, page: 0 }));
    }
  }, [address, dispatch]);

  if (stakedNfts.data.nfts.length === 0) {
    return null;
  }
  return (
    <Flex flexDir={"column"}>
      <Flex display={{ sm: "flex", md: "none" }}>
        <Link href={route.staked.route}>
          <a>
            <Heading
              mb={4}
              fontWeight="600"
              as="h2"
              fontSize={"24px"}
              color="dappTemplate.color2.base"
            >
              Staked NFTs
            </Heading>
          </a>
        </Link>
      </Flex>
      <Flex display={{ sm: "none", md: "flex" }}>
        <Heading
          mb={4}
          fontWeight="600"
          as="h2"
          fontSize={"24px"}
          color="dappTemplate.color2.base"
        >
          Staked NFTs
        </Heading>
      </Flex>

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
            {stakedNfts.data.nfts.map((nft, i) => {
              return (
                <SwiperSlide key={i}>
                  <Box width="80%">
                    <NFTCard
                      nft={nft}
                      onClick={() => handleViwNft(nft)}
                      wrapperProps={{
                        borderRadius: { sm: "15px", md: "30px" },
                        p: {
                          sm: "5px",
                          md: "15px",
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
      <Flex
        w="full"
        mt={4}
        justifyContent={"flex-end"}
        display={{ sm: "none", md: "flex" }}
      >
        <Link href={route.staked.route}>
          <a>
            <Box cursor="pointer" _hover={{ fontWeight: "bold" }}>
              View all
            </Box>
          </a>
        </Link>
      </Flex>
      {isOpen && (
        <NftModal isOpen={isOpen} onClose={onClose} nft={selectedNft} />
      )}
    </Flex>
  );
};

export default StakedNfts;
