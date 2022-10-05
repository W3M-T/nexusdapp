import { useEffect, useState } from "react";
import { INft } from "../../../redux/types/tokens.interface";
import { selectNfts } from "../../slices/tokens";
import { useAppSelector } from "../core/useRedux";

const useGetNfts = (
  options: {
    filter?: { key: string; value: string };
    initialValue?: INft[];
  } = null
) => {
  const { data: nfts } = useAppSelector(selectNfts);
  const [NFTs2, setNFTs] = useState<INft[]>(options?.initialValue || []);

  useEffect(() => {
    if (nfts.length > 0) {
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

  return NFTs2;
};

export default useGetNfts;
