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
