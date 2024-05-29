import { Box, Center, Flex, Grid, Heading, HStack, Select, Text, VStack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
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
import useGetListedNfts from "../../shared/hooks/tools/useGetListedNfts";
import UserNftCard from "../../shared/components/ui/NftsUserModal/UserNftCard/UserNftCard";
import { BigUIntValue, BytesValue } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import useGetNfts from "../../shared/hooks/tools/useGetNfts";
import useGetListedNftsFull from "../../shared/hooks/tools/useGetListedNftsFull";
import { addDays } from "date-fns";
import SearchBar from "../../shared/components/ui/SearchBar";
import SelectDark, { OptionSelectDark } from "../../shared/components/ui/SelectDark";

const numberToHex = (num: number): string => {
  let hexString = num.toString(16);
  // Check if the length is odd
  if (hexString.length % 2 !== 0) {
    // If odd, pad with a leading zero
    hexString = "0" + hexString;
  }
  return hexString;
};

const NftMarketplace = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);

  const { listings, isLoadingListings, errorListings } = useGetListedNftsFull({});
  const [filteredListings, setFilteredListings] = useState(listings);

  const handleSearch = (query) => {
    const filtered = listings.filter((listing) => {
      return listing.identifier.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredListings(filtered);
  };

  const handleSort = (sortBy) => {
    let sortedListings = [...filteredListings];
    if (sortBy === 'Newest') {
      sortedListings.sort((a, b) => b.listingTimestamp - a.listingTimestamp);
    } else if (sortBy === 'Oldest') {
      sortedListings.sort((a, b) => a.listingTimestamp - b.listingTimestamp);
    } else if (sortBy === 'A-Z') {
      sortedListings.sort((a, b) => a.identifier.localeCompare(b.identifier));
    } else if (sortBy === 'Z-A') {
      sortedListings.sort((a, b) => b.identifier.localeCompare(a.identifier));
    } else if (sortBy === 'Low price') {
      sortedListings.sort((a, b) => a.listingPrice - b.listingPrice);
    } else if (sortBy === 'High price') {
      sortedListings.sort((a, b) => b.listingPrice - a.listingPrice);
    }
    setFilteredListings(sortedListings);
  };
  
  useMemo(() => {
    setFilteredListings(listings);
  }, [listings?.length]);

  const sortOptions = ['Newest', 'Oldest', 'A-Z', 'Z-A', 'Low price', 'High price']
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
        <HStack justifyContent={"space-between"} px={{sm:2, md:4}} textColor={"whiteAlpha.400"}>
          <SearchBar
            wrapperProps={{ w: "30vw", maxWidth: "220px" }}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={"Search..."}
          />
          <Flex
            justifyContent={"space-between"}
            borderRadius={"2xl"} w={"30vw"} maxW={"220px"}
            backgroundColor={customColors.myCustomColor.base}
          >
            <Select
              borderColor={"transparent"}
              border={"none"}
              p={0}
              m={0}
              borderRadius={"2xl"}
              onChange={(e) => handleSort(e.target.value)}
            >
              <OptionSelectDark value={null} borderRadius={"2xl"}>Sort by:</OptionSelectDark>
              {sortOptions.map((t) => {
                if (!t) {
                  return null;
                }
                return (
                  <OptionSelectDark key={t} value={t}>{t}</OptionSelectDark>
                );
              })}
            </Select>
          </Flex>
        </HStack>

        {!isLoadingListings && !errorListings && filteredListings?.length > 0 ? (
          <Grid
            w={"full"}
            // justifyItems={"normal"}
            gap={{sm: 3, md: 8}}
            // flexWrap="wrap"
            mt={3}
            borderTop={"4px solid"}
            borderColor={customColors.myCustomColor.darker}
            p={{sm: 3, md: 6}}
            bg={customColors.myCustomColor.lighter}
            borderRadius={"3xl"}
            templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
            overflowY={"auto"}
            maxH={"85vh"}
          >
            {filteredListings.map((listing, i) => {
              return <UserNftCard key={i} nft={listing} />;
            })}
          </Grid>
        ) : filteredListings?.length == 0 ?
        (
          <Center w={"full"} h={'10vh'} fontSize={"lg"}>
            No NFTs found.
          </Center>
        ) :
        (
          <Center w={"full"} h={'10vh'} fontSize={"lg"}>
            Loading NFTs...
          </Center>
        )}
      </CardWrapper>

    </MainLayout>
  );
};

export default NftMarketplace;
