import useSwr from "swr";
import { IStaked } from "../../redux/types/pools.interface";
import { fetchNftRewards } from "../../services/sc/scQueries/nexusSc";
import { IFaucetInfo } from "../../redux/types/faucets.interface";
import { fetchFaucetInfo } from "../../services/sc/scQueries/faucetSCs";
import { fetchListedNfts, fetchNftMarketplaceFee } from "../../services/sc/scQueries/nftMarketplace";

const useGetNftMarketplaceFee = () => {
  const { data, isLoading, error } = useSwr(
    ["NftMarketplaceWsp:getFeePercentage"],
    fetchNftMarketplaceFee
  );

  return {
    fee: data,
    isLoadingFee: isLoading,
    errorFee: error,
  };
};

export default useGetNftMarketplaceFee;
