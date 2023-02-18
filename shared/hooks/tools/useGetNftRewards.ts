import useSwr from "swr";
import { IStaked } from "../../redux/types/pools.interface";
import { fetchNftRewards } from "../../services/sc/scQueries/nexusSc";
const useGetNftRewards = (nft: IStaked) => {
  const { data, isLoading, error } = useSwr<number>(
    [
      "NftStakingPoolsWsp:calcEstRewardableDays",
      nft.nftPool,
      nft.token,
      nft.nonce,
    ],
    fetchNftRewards
  );

  return {
    reward: data,
    isLoading,
    error,
  };
};

export default useGetNftRewards;
