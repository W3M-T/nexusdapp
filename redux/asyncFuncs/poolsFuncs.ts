import { Address, AddressValue, BytesValue } from "@elrondnetwork/erdjs/out";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFromAllTokens } from "../../services/rest/axiosEldron";
import { NftStakingPoolsWsp } from "../../services/sc";
import { scQuery } from "../../services/sc/queries";
import { IExistingPool, IPoolStats, IStaked } from "../types/pools.interface";

export const fetchStats = createAsyncThunk("pools/fetchStats", async () => {
  const res = await scQuery(NftStakingPoolsWsp, "getInfo");
  const { firstValue } = res;

  const tokens = firstValue.valueOf().field2.map((fee) => {
    return fee.field0;
  });
  const data: IPoolStats = {
    feesCollected: firstValue.valueOf().field2.map((fee) => {
      return { token: fee.field0, amount: fee.field1.toNumber() };
    }),
    poolsCreated: firstValue.valueOf().field0.toNumber(),
    nftStaked: firstValue.valueOf().field1.toNumber(),
  };

  const resapitokens = await getFromAllTokens({
    identifiers: tokens.join(","),
  });

  return data;
});

export const fetchExistringPools = createAsyncThunk(
  "pools/fetchExistringPools",
  async () => {
    const res = await scQuery(NftStakingPoolsWsp, "getExistingPools");
    const { firstValue } = res;
    console.log("getExistingPools", firstValue.valueOf());

    const data: IExistingPool[] = firstValue.valueOf().map((pool) => {
      return {
        timestam: pool.field0.creation_timestamp.toNumber(),
        creator: pool.field0.creator.bech32(),
        collection: pool.field0.collection,
        nfts: pool.field0.nr_of_nfts.toNumber(),
        token: pool.field0.reward_token,
        rewards: pool.field0.reward_amount.toNumber(),
        poolName: pool.field1.toString(),
        nftsNow: pool.field2.toNumber(),
        urls: pool.field3.map((url) => url.toString()),
      };
    });
    console.log("getExistingPools", data);

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

    const data: IStaked[] = firstValue.valueOf().map((nft) => {
      return {
        address: nft.field0.address.bech32(),
        nonce: nft.field0.nft_nonce.toNumber(),
        nftPool: {
          timestam: nft.field0.nft_pool.creation_timestamp.toNumber(),
          creator: nft.field0.nft_pool.creator.bech32(),
          collection: nft.field0.nft_pool.collection,
          nfts: nft.field0.nft_pool.nr_of_nfts.toNumber(),
          token: nft.field0.nft_pool.reward_token,
          rewards: nft.field0.nft_pool.reward_amount.toNumber(),
        },
        token: nft.field0.nft_token,
        urls: nft.field1.map((url) => {
          const b = new Buffer(url);
          return b.toString();
        }),
      };
    });
    console.log("fetchUserStaked data", data);

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
export const fetchRegistrationInfo = createAsyncThunk(
  "pools/fetchRegistrationInfo",
  async ({ address, collection }: { address: string; collection: string }) => {
    const res = await scQuery(NftStakingPoolsWsp, "getRegistrationInfo", [
      new AddressValue(new Address(address)),
      BytesValue.fromUTF8(collection),
    ]);
    const { firstValue } = res;

    const data = firstValue.valueOf();
    console.log("fetchRegistrationInfo", data);

    return {
      tokenI: data.field0,
      tokenAmount: data.field1.toNumber(),
      payed: data.field2,
    };
  }
);
