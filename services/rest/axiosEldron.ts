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
