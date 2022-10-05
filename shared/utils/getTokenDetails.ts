import { AxiosResponse } from "axios";
import { getFromAllTokens } from "../services/rest/axiosEldron";
import { IElrondToken } from "../types/network";

export async function getTokenDetails(tokenIdentifier: string) {
  const { data: tokenDetail }: AxiosResponse<IElrondToken[]> =
    await getFromAllTokens({
      identifier: tokenIdentifier,
    });

  return tokenDetail[0];
}
