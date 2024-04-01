import useSwr from "swr";
import { IStaked } from "../../redux/types/pools.interface";
import { fetchNftRewards, fetchUserEarnings } from "../../services/sc/scQueries/nexusSc";
import { IFaucetInfo } from "../../redux/types/faucets.interface";
import { fetchFaucetInfo } from "../../services/sc/scQueries/faucetSCs";

const useGetUserEarnings = (address: string) => {
  const { data, isLoading, error } = useSwr(
    ["NftStakingPoolsWsp", address],
    fetchUserEarnings
  );

  return {
    userEarnings: data || [],
    isLoadingUserEarnings: isLoading,
    errorUserEarnings: error,
  };
};

export default useGetUserEarnings;
