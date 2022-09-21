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
}
export interface IStaked {
  tokenIdentifier: string;
  value: number;
}
