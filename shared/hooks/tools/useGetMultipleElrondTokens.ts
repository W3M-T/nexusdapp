import useSWR from "swr";
import { IElrondToken } from "../../types/network";
import { getFromAllTokens } from "../../services/rest/axiosEldron";
import { getEconomics } from "../../services/rest/elrondApi/network";
import { chainType, networkConfig } from "../../../config/network";

const tokensID = networkConfig[chainType].tokens;

const useGetMultipleElrondTokens = (tokensIdentifiers: string[]) => {
  const isEgldonTokens = tokensIdentifiers.includes("EGLD");
  const { data, error } = useSWR(
    tokensIdentifiers.length !== 0
      ? {
          identifiers: tokensIdentifiers.join(","),
        }
      : null,
    getFromAllTokens
  );

  const { data: egldData, error: egkdError } = useSWR(
    {
      identifier: isEgldonTokens ? {} : null,
    },
    getEconomics
  );

  let finalData: IElrondToken[] = data?.data ? [...data?.data] : [];
  if (isEgldonTokens) {
    if (egldData && finalData) {
      if (finalData.findIndex((item) => item.identifier === "EGLD") === -1) {
        finalData.unshift({
          type: "EGLD",
          identifier: "EGLD",
          name: "EGLD",
          ticker: "EGLD",
          decimals: 18,
          // assets: {
          //   svgUrl: "/images/egld.svg",
          // },
          price: egldData.data.price,
          marketCap: egldData.data.marketCap,
          supply: egldData.data.totalSupply,
          circulatingSupply: egldData.data.circulatingSupply,
          owner: "",
          isPaused: false,
          assets: {
            description: "",
            status: "",
            social: {
              telegram: "",
              twitter: ""
            },
            pngUrl: "",
            svgUrl: ""
          },
          transactions: 0,
          accounts: 0,
          canUpgrade: false,
          canMint: false,
          canBurn: false,
          canChangeOwner: false,
          canPause: false,
          canFreeze: false,
          canWipe: false
        });
      }
    }
  }

  return {
    tokens: finalData || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export default useGetMultipleElrondTokens;
