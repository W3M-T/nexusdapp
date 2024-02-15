import useSWR from "swr";
import { fetchAshSwapFee } from "../../services/sc/scQueries/nexusSwapSc";

const useGetAshSwapFee = () => {
  const { data, isLoading, error } = useSWR(
    "nexusSwap:feePercentage",
    fetchAshSwapFee
  );

  const finalData = data || 0;

  return {
    fee: finalData,
    isLoadingFee: isLoading,
    errorOnFee: error,
  };
};

export default useGetAshSwapFee;
