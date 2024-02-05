import { useState } from "react";
import useSWR from "swr";
import { selectUserAddress } from "../../redux/slices/settings";
import { INft } from "../../redux/types/tokens.interface";
import { swrFetcher } from "../../services/rest/axiosEldron";
import { useAppSelector } from "../core/useRedux";


const useGetUserTokens = (): any => {
  const address = useAppSelector(selectUserAddress);

  const { data: userTokens, isLoading: isLoadingUserTokens, error: errorUserTokens } = useSWR<any>(
    address && `/accounts/${address}/tokens?size=100`,
    swrFetcher
  );

  return {
    userTokens,
    isLoadingUserTokens,
    errorUserTokens
  };
};

export default useGetUserTokens;
