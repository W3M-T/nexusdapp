import { useState } from "react";
import useSWR from "swr";
import { selectUserAddress } from "../../redux/slices/settings";
import { INft } from "../../redux/types/tokens.interface";
import { swrFetcher } from "../../services/rest/axiosEldron";
import { useAppSelector } from "../core/useRedux";
import { networkConfig, chainType } from "../../../config/network";
import { MultiversxLogo } from "../../components/icons/ui";

const { gatewayAddress, contractAddr, tokens } = networkConfig[chainType];


const useGetUserEgld = (): any => {
  const address = useAppSelector(selectUserAddress);

  let { data: userEgld, isLoading: isLoadingUserEgld, error: errorUserEgld } = useSWR<any>(
    address && `/accounts/${address}`,
    swrFetcher
  );

  const { data: wegldData } = useSWR<any>(
    address && `/tokens/${tokens.WEGLD.identifier || ""}`,
    swrFetcher
  );

  if (userEgld && wegldData) {
    userEgld = { ...userEgld,
      price: wegldData.price,
      decimals: 18,
      identifier: "EGLD",
      assets: { img: MultiversxLogo },
      name: "EGLD",
      ticker: "EGLD"
    };
  }

  return {
    userEgld,
    isLoadingUserEgld,
    errorUserEgld
  };
};

export default useGetUserEgld;
