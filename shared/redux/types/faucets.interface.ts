import { IElrondToken } from "../../types/network";

export interface IFaucetInfo {
  token: string;
  amount: number;
  availableBalance: number;
  aggregatedEpochs: number;
  currentEpoch: number;
  userLastClaimEpoch: number;
  userClaimable: number;
  canUserClaim: boolean;
  userClaimed: number;
  totalClaimed: number;
}