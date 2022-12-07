import axios from "axios";
import { selectedNetwork } from "../../../config/network";
const BASE_URL = selectedNetwork.apiAddress;

const axiosEldron = axios.create({
  baseURL: BASE_URL,
});

export default axiosEldron;

export const getCollectionDetails = async (collection: string) => {
  return axiosEldron.get(`/collections/${collection}`);
};
export const getNft = async (identifier: string) => {
  return axiosEldron.get(`/nfts/${identifier}`);
};

export const getFromAllTokens = async ({
  size = 10000,
  name = undefined,
  identifier = undefined,
  identifiers = undefined,
  search = undefined,
}) => {
  return await axiosEldron.get("/tokens", {
    params: {
      identifier,
      identifiers,
      name,
      size,
      search,
    },
  });
};
export const getFromAllNFTs = async ({
  size = 10000,
  name = undefined,
  identifiers = undefined,
  search = undefined,
  extraQuery = "",
}) => {
  return await axiosEldron.get("/nfts" + extraQuery, {
    params: {
      identifiers,
      name,
      size,
      search,
    },
  });
};

export const getNfts = async (address, size = 1000) => {
  return await axiosEldron.get(`/accounts/${address}/nfts?size=${size}`);
};

export const swrFetcher = (url) => axiosEldron.get(url).then((res) => res.data);

export const getCollectionsCount = async (colectionIdentifier: string) => {
  const res = await axiosEldron.get<number>(
    `/collections/${colectionIdentifier}/nfts/count`
  );

  return res.data;
};

// export const swrGetUserNfts = async (address, size = 1000) => {
//   return await  axiosEldron.get(`/accounts/${address}/nfts?size=${size}`);
// };
// // const fetcher = url => axios.get(url).then(res => res.data)

// const fetcher = (url) => axios.get(url).then((res) => res.data);
