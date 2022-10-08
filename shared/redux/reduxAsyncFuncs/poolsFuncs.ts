import { Address, AddressValue, BytesValue } from "@elrondnetwork/erdjs/out";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ONLY_ADMIN, ONLY_NFT_CREATOR } from "../../../config/constants";
import { EgldToken } from "../../constants/tokens";
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

  const resapitokens = await getFromAllTokens({
    identifiers: tokens.join(","),
  });
  const tokensDetails = [...resapitokens.data, EgldToken];

  const data: IPoolStats = {
    feesCollected: firstValue.valueOf().field2.map((fee) => {
      const index = tokensDetails.findIndex(
        (token) => token.identifier === fee.field0
      );
      if (index !== -1) {
        return {
          token: fee.field0,
          amount: fee.field1.toNumber(),
          tokenDetials: tokensDetails[index],
        };
      }
    }),
    poolsCreated: firstValue.valueOf().field0.toNumber(),
    nftStaked: firstValue.valueOf().field1.toNumber(),
  };

  return { ...data, feesCollected: data.feesCollected };
});

export const fetchExistringPools = createAsyncThunk(
  "pools/fetchExistringPools",
  async () => {
    const res = await scQuery(NftStakingPoolsWsp, "getExistingPools");
    const { firstValue } = res;

    const data: IExistingPool[] = firstValue.valueOf().map((pool) => {
      const data: IExistingPool = {
        timestam: pool.field0.creation_timestamp.toNumber() * 1000,
        creator: pool.field0.creator.bech32(),
        collection: pool.field0.collection,
        nfts: pool.field0.nr_of_nfts.toNumber(),
        token: pool.field0.reward_token,
        rewards: pool.field0.reward_amount.toNumber(),
        poolName: pool.field1.toString(),
        nftsNow: pool.field2.toNumber(),
        url: pool.field3.toString(),
      };
      return data;
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

    const data: IStaked[] = firstValue.valueOf().map((nft) => {
      const nftData: IStaked = {
        address: nft.field0.address.bech32(),
        nonce: nft.field0.nft_nonce.toNumber(),
        nftPool: {
          timestam: nft.field0.nft_pool.creation_timestamp.toNumber() * 1000,
          creator: nft.field0.nft_pool.creator.bech32(),
          collection: nft.field0.nft_pool.collection,
          nfts: nft.field0.nft_pool.nr_of_nfts.toNumber(),
          token: nft.field0.nft_pool.reward_token,
          rewards: nft.field0.nft_pool.reward_amount.toNumber(),
        },
        token: nft.field0.nft_token,
        name: nft.field1.toString(),
        url: nft.field2.toString(),
      };
      return nftData;
    });

    return data;
  }
);
export const fetchIsNftCreator = createAsyncThunk(
  "pools/fetchIsNftCreator",
  async (address: string) => {
    const res = await scQuery(NftStakingPoolsWsp, "getIsNftCreatorAndScOwner", [
      new AddressValue(new Address(address)),
    ]);
    const { firstValue } = res;
    console.log("firstValue", firstValue.valueOf());

    const data: { isNftCreator: boolean; isAdmin: boolean } = {
      isNftCreator: ONLY_NFT_CREATOR ? firstValue.valueOf().field0 : true,
      isAdmin: ONLY_ADMIN ? firstValue.valueOf().field1 : true,
    };

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

    return {
      tokenI: data.field0,
      tokenAmount: data.field1.toNumber(),
      payed: data.field2,
    };
  }
);
export const fetchAllowedRegistrationTokens = createAsyncThunk(
  "pools/fetchAllowedRegistrationTokens",
  async () => {
    const res = await scQuery(NftStakingPoolsWsp, "allowedRegistrationTokens");
    const { firstValue } = res;

    const data = firstValue.valueOf();

    return data;
  }
);
export const fetchAllowedRewardTokens = createAsyncThunk(
  "pools/fetchAllowedRewardTokens",
  async () => {
    const res = await scQuery(NftStakingPoolsWsp, "allowedRewardTokens");
    const { firstValue } = res;

    const data = firstValue.valueOf();

    return data;
  }
);
