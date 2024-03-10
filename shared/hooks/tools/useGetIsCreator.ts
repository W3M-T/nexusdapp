import useSwr from "swr";
import { IStaked } from "../../redux/types/pools.interface";
import { fetchIsCreator, fetchNftRewards } from "../../services/sc/scQueries/nexusSc";

const useGetIsCreator = (address: string) => {
  const { data, isLoading, error } = useSwr<boolean>(
    ["NftStakingPoolsWsp:getIsUserCreator", address],
    fetchIsCreator
  );

  return {
    isCreator: data,
    isLoadingIsCreator: isLoading,
    errorIsCreator: error,
  };
};

export default useGetIsCreator;
