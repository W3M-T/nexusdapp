import useSwr from "swr";
import { IStaked } from "../../redux/types/pools.interface";
import { fetchNftRewards } from "../../services/sc/scQueries/nexusSc";
import { IFaucetInfo } from "../../redux/types/faucets.interface";
import { fetchFaucetInfo } from "../../services/sc/scQueries/faucetSCs";

const useGetMermaidFaucetInfo = (address: string) => {
  const { data, isLoading, error } = useSwr(
    ["FaucetMermaidWsp:getFaucetInfo", "mermaid", address],
    fetchFaucetInfo
  );

  return {
    mermaidFaucetInfo: data,
    isLoadingMermaidFaucetInfo: isLoading,
    errorMermaidFaucetInfo: error,
  };
};

export default useGetMermaidFaucetInfo;
