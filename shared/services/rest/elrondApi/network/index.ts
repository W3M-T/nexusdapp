import { IElrondEconomics, IElrondStats } from "../../../../redux/types/elrond.interface";
import axiosEldron from "../../axiosEldron";

export const getNetworkStats = async () => {
  return await axiosEldron.get<IElrondStats>("/stats");
};
export const getEconomics = async () => {
  return await axiosEldron.get<IElrondEconomics>("/economics");
};
