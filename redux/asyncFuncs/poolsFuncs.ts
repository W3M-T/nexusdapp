import { createAsyncThunk } from "@reduxjs/toolkit";
import { NftStakingPoolsWsp } from "../../services/sc";
import { scQuery } from "../../services/sc/queries";
import { IExistingPool, IPoolStats } from "../types/pools.interface";

export const fetchStats = createAsyncThunk("pools/fetchStats", async () => {
  const res = await scQuery(NftStakingPoolsWsp, "getStats");
  const { firstValue } = res;

  const data: IPoolStats = {
    feesCollected: firstValue.valueOf().field2.map((fee) => {
      return { token: fee.field0, amount: fee.field1.toNumber() };
    }),
    poolsCreated: firstValue.valueOf().field0.toNumber(),
    nftStaked: firstValue.valueOf().field1.toNumber(),
  };

  return data;
});

export const fetchExistringPools = createAsyncThunk(
  "pools/fetchExistringPools",
  async () => {
    const res = await scQuery(NftStakingPoolsWsp, "getExistingPools");
    const { firstValue } = res;
    console.log("firstValue", firstValue);

    const data: IExistingPool[] = [];
    console.log("data", data);

    return data;
  }
);
