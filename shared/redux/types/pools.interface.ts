import { IElrondToken } from "../../types/network";

export interface IPoolStats {
  poolsCreated: number;
  nftStaked: number;
  feesCollected: {
    token: string;
    amount: number;
    tokenDetials: {
      identifier: string;
      name: string;
      ticker: string;
      decimals: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assets: any;
    };
  }[];
}

export interface IExistingPool {
  timestam: number;
  creator: string;
  collection: string;
  nfts: number;
  token: string;
  rewards: string;
  isStakingDisabled: boolean;
  poolDuration?: number;
  poolName?: string;
  nftsNow?: number;
  url?: string;
}
export interface IStaked {
  address: string;
  nonce: number;
  nftPool: IExistingPool;
  token: string;
  url: string;
  name: string;
  estimatedRewards: number;
}

export interface IStakedWithTokenDetails extends IStaked {
  tokenDetails: IElrondToken;
}
