import { useState } from "react";
import useSWR from "swr";
import { selectUserAddress } from "../../redux/slices/settings";
import { INft } from "../../redux/types/tokens.interface";
import { swrFetcher } from "../../services/rest/axiosEldron";
import { useAppSelector } from "../core/useRedux";
import useGetListedNfts from "./useGetListedNfts";
import { chainType, networkConfig } from "../../../config/network";
import { IListedNft } from "../../redux/types/nftMarketplace.interface";


const useGetListedNftsFull = (sizeLimit?: number, onlyUserListings?: boolean): any => {
  const userAddress = useAppSelector(selectUserAddress);
  const scAddress = networkConfig[chainType].contractAddr.nftMarketplace;

  const {listings, isLoadingListings, errorListings} = useGetListedNfts(onlyUserListings ? userAddress : "");

  const { data: nftsInSc } = useSWR<IListedNft[]>(
    scAddress && `/accounts/${scAddress}/nfts?size=${sizeLimit ? sizeLimit : 10000}`,
    swrFetcher
  );

  if (!isLoadingListings && nftsInSc && listings) {
    const nftsFull = nftsInSc.map(nft => {
      const correspondingListing = listings.find(listing => listing.nft_token === nft.collection && listing.nft_nonce === nft.nonce);
      if (correspondingListing) {
        return {
          ...nft,
          listingId: correspondingListing.listingId,
          listingCreator: correspondingListing.creator,
          listingPrice: correspondingListing.price,
          listingTimestamp: correspondingListing.timestamp
        };
      }
      return nft;
    });

    return {
      listings: nftsFull,
      isLoadingListings: isLoadingListings,
      errorListings: errorListings,
    };
  }

  return {
    listings: null,
    isLoadingListings: false,
    errorListings: true,
  };
};

export default useGetListedNftsFull;
