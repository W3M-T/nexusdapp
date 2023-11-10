import useSwr from "swr";
import { IStaked } from "../../redux/types/pools.interface";
import { fetchNftRewards } from "../../services/sc/scQueries/nexusSc";
import { IFaucetInfo } from "../../redux/types/faucets.interface";
import { fetchFaucetInfo } from "../../services/sc/scQueries/faucetSCs";

const useGetNexusFaucetInfo = (address: string) => {
  const { data, isLoading, error } = useSwr(
    ["FaucetNexusWsp:getFaucetInfo", "nexus", address],
    fetchFaucetInfo
  );

  return {
    nexusFaucetInfo: data,
    isLoadingNexusFaucetInfo: isLoading,
    errorNexusFaucetInfo: error,
  };
};

export default useGetNexusFaucetInfo;
