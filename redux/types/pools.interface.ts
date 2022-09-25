export interface IPoolStats {
  poolsCreated: number;
  nftStaked: number;
  feesCollected: {
    token: string;
    amount: number;
  }[];
}

export interface IExistingPool {
  timestam: number;
  creator: string;
  collection: string;
  nfts: number;
  token: string;
  rewards: string;

  poolName: string;
  nftsNow: number;
  urls: string[];
}
export interface IStaked {
  address: string;
  nonce: number;
  nftPool: IExistingPool;
  token: string;
  urls: string[];
}
