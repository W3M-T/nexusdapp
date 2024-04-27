import { useState } from "react";
import useSWR from "swr";
import { selectUserAddress } from "../../redux/slices/settings";
import { INft } from "../../redux/types/tokens.interface";
import { swrFetcher } from "../../services/rest/axiosEldron";
import { useAppSelector } from "../core/useRedux";

interface UseGetNftsOptions {
  filter?: { key: string; value: string };
  initialValue?: INft[];
}

const useGetNfts = (
  options: UseGetNftsOptions = {},
  transformResponse?: (nfts: INft[]) => any[],
  sizeLimit?: number
): any => {
  const address = useAppSelector(selectUserAddress);
  const { data: nfts } = useSWR<INft[]>(
    address && `/accounts/${address}/nfts?size=${sizeLimit ? sizeLimit : 1000}`,
    swrFetcher
  );

  const filteredNfts = (nfts || []).filter((nft) => {
    return !options.filter || nft[options.filter.key] === options.filter.value || !options.filter.value;
  });

  return transformResponse ? transformResponse(filteredNfts) : filteredNfts;
};

export default useGetNfts;
