import { useEffect, useState } from "react";
import { fetchNfts } from "../../redux/asyncFuncs/tokensFuncs";
import { selectUserAddress } from "../../redux/slices/settings";
import { selectNfts } from "../../redux/slices/tokens";
import { INft } from "../../redux/types/tokens.interface";
import { useAppDispatch, useAppSelector } from "../core/useRedux";

const useGetNfts = (
  options: {
    filter?: { key: string; value: string };
    initialValue?: INft[];
  } = null
) => {
  const { data: nfts } = useAppSelector(selectNfts);
  const connectedAddress = useAppSelector(selectUserAddress);
  const [NFTs2, setNFTs] = useState<INft[]>(options?.initialValue || []);

  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("me ejecuto");
    if (connectedAddress) {
      dispatch(fetchNfts(connectedAddress));
    }
  }, [dispatch, connectedAddress]);

  useEffect(() => {
    if (nfts.length > 0) {
      const sftsList = [];

      nfts.forEach((nft) => {
        console.log("options?.filter.value", options?.filter.value);
        console.log("nft collection", nft.collection);
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
