import useSWR from "swr";
import { selectedNetwork } from "../../../config/network";
import {
  getFromAllTokens,
  getTokenPrice,
} from "../../services/rest/axiosEldron";
import { IElrondToken } from "../../types/network";

const useGetElrondToken = (tokenIdeniifer: string) => {
  const { data, error } = useSWR(
    {
      identifier: tokenIdeniifer === "EGLD" ? null : tokenIdeniifer,
    },
    getFromAllTokens
  );
  const { data: egldPrice, error: egkdError } = useSWR(
    tokenIdeniifer === "EGLD" ? selectedNetwork.tokens.WEGLD.identifier : null,
    getTokenPrice
  );

  const dataApi = data?.data.length > 0 && data?.data[0];
  let manualData = null;
  if (tokenIdeniifer === "EGLD") {
    if (egldPrice) {
      manualData = {
        type: "FungibleESDT",
        identifier: "EGLD",
        name: "EGLD",
        ticker: "EGLD",
        decimals: 18,
        assets: {
          svgUrl: "/images/egld.svg",
        },
        price: egldPrice,
      };
    }
  }

  const finalDAta: IElrondToken = manualData || dataApi;
  return {
    token: finalDAta,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useGetElrondToken;
