import useSwr from "swr";
import { IStaked } from "../../redux/types/pools.interface";
import { fetchNftRewards } from "../../services/sc/scQueries/nexusSc";
import { IFaucetInfo } from "../../redux/types/faucets.interface";
import { fetchFaucetInfo } from "../../services/sc/scQueries/faucetSCs";
import { fetchListedNfts } from "../../services/sc/scQueries/nftMarketplace";

const useGetListedNfts = (address?: string) => {
  const { data, isLoading, error } = useSwr(
    [!address ? "" : address],
    fetchListedNfts
  );

  return {
    listings: data,
    isLoadingListings: isLoading,
    errorListings: error,
  };
};

export default useGetListedNfts;
