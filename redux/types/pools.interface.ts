export interface IPoolStats {
  poolsCreated: number;
  nftStaked: number;
  feesCollected: {
    token: string;
    amount: number;
  }[];
}
