import { useEffect, useState } from "react";
import useSWR from "swr";
import { selectUserAddress } from "../../redux/slices/settings";
import { INft } from "../../redux/types/tokens.interface";
import { swrFetcher } from "../../services/rest/axiosEldron";
import { useAppSelector } from "../core/useRedux";
const useGetNfts = (
  options: {
    filter?: { key: string; value: string };
    initialValue?: INft[];
  } = null,
  transformResponse?: (nfts: INft[]) => any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  const address = useAppSelector(selectUserAddress);
  const { data: nfts } = useSWR<INft[]>(
    address && `/accounts/${address}/nfts?size=1000`,
    swrFetcher
  );
  const [NFTs2, setNFTs] = useState<INft[]>(options?.initialValue || []);

  useEffect(() => {
    if (nfts && nfts.length > 0) {
      const sftsList = [];

      nfts.forEach((nft) => {
        if (options?.filter?.value) {
          if (nft[options?.filter.key] === options?.filter.value) {
            sftsList.push(nft);
          }
        } else {
          sftsList.push(nft);
        }
      });

      setNFTs(sftsList);
    }
  }, [nfts, options?.filter.key, options?.filter.value]);

  if (transformResponse) {
    return transformResponse(NFTs2);
  } else {
    return NFTs2;
  }
};

export default useGetNfts;
