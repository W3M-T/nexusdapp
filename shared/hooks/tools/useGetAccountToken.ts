import { useState } from "react";
import useSWR from "swr";
import { selectUserAddress } from "../../redux/slices/settings";
import { INft } from "../../redux/types/tokens.interface";
import { swrFetcher } from "../../services/rest/axiosEldron";
import { useAppSelector } from "../core/useRedux";
import { MultiversxLogo } from "../../components/icons/ui";
import { chainType, networkConfig } from "../../../config/network";

const { gatewayAddress, contractAddr, tokens } = networkConfig[chainType];

const useGetAccountToken = (token_id: String): any => {
  const address = useAppSelector(selectUserAddress);

  const { data: accountToken, isLoading: isLoadingAccountToken, error: errorAccountToken } = useSWR<any>(
    address && `/accounts/${address}/tokens/${token_id}`,
    swrFetcher
  );

  let { data: userEgld, isLoading: isLoadingUserEgld, error: errorUserEgld } = useSWR<any>(
    address && `/accounts/${address}`,
    swrFetcher
  );

  const { data: wegldData } = useSWR<any>(
    address && `/tokens/${tokens.WEGLD.identifier || ""}`,
    swrFetcher
  );

  if (token_id != "EGLD") {
    return {
      accountToken,
      isLoadingAccountToken,
      errorAccountToken
    };
  } else {
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
      accountToken: userEgld,
      isLoadingAccountToken: isLoadingUserEgld,
      errorAccountToken: errorUserEgld
    };
  }
};

export default useGetAccountToken;
