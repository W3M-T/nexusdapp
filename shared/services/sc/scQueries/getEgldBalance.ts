import axios from "axios";
import { selectedNetwork } from "../../../../config/network";
import { IElrondUserAccount } from "../../../types/network";

const BASE_URL = selectedNetwork.apiAddress;

export const axiosEldron = axios.create({
  baseURL: BASE_URL,
});

const getEgldBalance = async (address): Promise<IElrondUserAccount> => {
  const res = await axiosEldron.get<IElrondUserAccount>(`/accounts/${address}`);
  return res.data;
};

export default getEgldBalance;