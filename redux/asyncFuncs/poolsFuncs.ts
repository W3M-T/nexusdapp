import { Address, AddressValue } from "@elrondnetwork/erdjs/out";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { NftStakingPoolsWsp } from "../../services/sc";
import { scQuery } from "../../services/sc/queries";
import { IExistingPool, IPoolStats, IStaked } from "../types/pools.interface";

export const fetchStats = createAsyncThunk("pools/fetchStats", async () => {
  const res = await scQuery(NftStakingPoolsWsp, "getInfo");
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

    const data: IExistingPool[] = firstValue.valueOf().map((pool) => {
      return {
        timestam: pool.creation_timestamp.toNumber(),
        creator: pool.creator.bech32(),
        collection: pool.collection,
        nfts: pool.nr_of_nfts.toNumber(),
        token: pool.reward_token,
        rewards: pool.reward_amount.toNumber(),
      };
    });

    return data;
  }
);
export const fetchUserStaked = createAsyncThunk(
  "pools/fetchUserStaked",
  async (address: string) => {
    const res = await scQuery(NftStakingPoolsWsp, "getUserStaked", [
      new AddressValue(new Address(address)),
    ]);
    const { firstValue } = res;
    console.log("fetchUserStaked firstValue", firstValue.valueOf());

    const data: IStaked[] = [];
    // console.log("fetchUserStaked data", data);

    return data;
  }
);
export const fetchIsNftCreator = createAsyncThunk(
  "pools/fetchIsNftCreator",
  async (address: string) => {
    const res = await scQuery(NftStakingPoolsWsp, "getIsNftCreator", [
      new AddressValue(new Address(address)),
    ]);
    const { firstValue } = res;

    const data = true;

    return data;
  }
);
export const fetchNonWithdrawnCollections = createAsyncThunk(
  "pools/fetchNonWithdrawnCollections",
  async () => {
    const res = await scQuery(NftStakingPoolsWsp, "getNonWithdrawnCollections");
    const { firstValue } = res;

    const data = firstValue.valueOf();

    return data;
  }
);
