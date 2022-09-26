import axios from "axios";
import { selectedNetwork } from "../../config/network";
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
