import {
  Address,
  AddressType,
  AddressValue,
  BigUIntType,
  BigUIntValue,
  BytesType,
  BytesValue,
  Field,
  FieldDefinition,
  Struct,
  StructType,
  TokenIdentifierType,
  TokenIdentifierValue,
  U32Type,
  U32Value,
  U64Type,
  U64Value,
} from "@elrondnetwork/erdjs/out";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import BigNumber from "bignumber.js";
import { adminAddresses } from "../../constants/addressess";
import { EgldToken } from "../../constants/tokens";
import { getFromAllTokens } from "../../services/rest/axiosEldron";
import { scQuery } from "../../services/sc/queries";
import { IElrondToken } from "../../types/network";
import {
  IExistingPool,
  IPoolStats,
  IStaked,
  IStakedWithTokenDetails,
} from "../types/pools.interface";
export const fetchStats = createAsyncThunk("pools/fetchStats", async () => {
  const res = await scQuery("NftStakingPoolsWsp", "getInfo");
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
    const res = await scQuery("NftStakingPoolsWsp", "getExistingPools");
    const { firstValue } = res;

    const data: IExistingPool[] = firstValue.valueOf().map((pool) => {
      const data: IExistingPool = {
        timestam: pool.field0.creation_timestamp.toNumber(),
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
  async ({ address, page }: { address: string; page: number }) => {
    const res = await scQuery("NftStakingPoolsWsp", "getUserStaked", [
      new AddressValue(new Address(address)),
      new BigUIntValue(new BigNumber(page)),
      new BigUIntValue(new BigNumber(10)),
    ]);

    const { firstValue } = res;

    const data: IStaked[] = firstValue.valueOf().field1.map((nft) => {
      const nftData: IStaked = {
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
        name: nft.field1.toString(),
        url: nft.field2.toString(),
        estimatedRewards: nft.field3.toNumber(),
      };

      return nftData;
    });

    const { data: tokensDetails }: AxiosResponse<IElrondToken[]> =
      await getFromAllTokens({
        identifiers: data
          .map((stakedInfo) => stakedInfo.nftPool.token)
          .join(","),
      });

    const finalData: IStakedWithTokenDetails[] = data.map((stakedInfo) => {
      const details: IElrondToken = tokensDetails.find(
        (token) => token.identifier === stakedInfo.nftPool.token
      );

      const stakedWithInfo: IStakedWithTokenDetails = {
        ...stakedInfo,
        tokenDetails: details,
      };

      return stakedWithInfo;
    });
    return {
      nfts: finalData,
      pagination: {
        pageCount: firstValue.valueOf().field0.toNumber(),
      },
    };
  }
);
export const fetchIsNftCreator = createAsyncThunk(
  "pools/fetchIsNftCreator",
  async (address: string) => {
    const res = await scQuery(
      "NftStakingPoolsWsp",
      "getIsNftCreatorAndScOwner",
      [new AddressValue(new Address(address))]
    );
    const { firstValue } = res;
    const forceAdmin = process.env.NEXT_PUBLIC_IS_ADMIN === "true";

    const forceNftCreator = process.env.NEXT_PUBLIC_IS_CREATOR === "true";
    const data: { isNftCreator: boolean; isAdmin: boolean } = {
      isNftCreator:
        adminAddresses.includes(address) ||
        (forceNftCreator ? forceNftCreator : firstValue.valueOf().field0),
      isAdmin:
        adminAddresses.includes(address) ||
        (forceAdmin ? forceAdmin : firstValue.valueOf().field1),
    };

    return {
      isNftCreator: data.isAdmin || data.isNftCreator,
      isAdmin: data.isAdmin,
    };
  }
);
export const fetchNonWithdrawnCollections = createAsyncThunk(
  "pools/fetchNonWithdrawnCollections",
  async () => {
    const res = await scQuery(
      "NftStakingPoolsWsp",
      "getNonWithdrawnCollections"
    );
    const { firstValue } = res;

    const data = firstValue.valueOf();

    return data;
  }
);
export const fetchRegistrationInfo = createAsyncThunk(
  "pools/fetchRegistrationInfo",
  async ({ address, collection }: { address: string; collection: string }) => {
    const res = await scQuery("NftStakingPoolsWsp", "getRegistrationInfo", [
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
    const res = await scQuery(
      "NftStakingPoolsWsp",
      "allowedRegistrationTokens"
    );
    const { firstValue } = res;

    const data = firstValue.valueOf();

    return data;
  }
);
export const fetchAllowedRewardTokens = createAsyncThunk(
  "pools/fetchAllowedRewardTokens",
  async () => {
    const res = await scQuery("NftStakingPoolsWsp", "allowedRewardTokens");
    const { firstValue } = res;

    const data = firstValue.valueOf();

    return data;
  }
);
export const fetcHhasStakedForAEN = createAsyncThunk(
  "pools/fetcHhasStakedForAEN",
  async (address: string) => {
    const res = await scQuery("NftStakingPoolsWsp", "hasStakedForAEN", [
      new AddressValue(new Address(address)),
    ]);
    const { firstValue } = res;

    const data = firstValue.valueOf();

    return data;
  }
);
export const fetchNeedsToUnstake = createAsyncThunk(
  "pools/fetchNeedsToUnstake",
  async (address: string) => {
    const res = await scQuery("NftStakingPoolsWsp", "needsToUnstake", [
      new AddressValue(new Address(address)),
    ]);
    const { firstValue } = res;

    const data = firstValue.valueOf();

    return data;
  }
);
export const fetchHasReadWarning = createAsyncThunk(
  "pools/fetchHasReadWarning",
  async (address: string) => {
    const res = await scQuery("NftStakingPoolsWsp", "hasReadWarning", [
      new AddressValue(new Address(address)),
    ]);
    const { firstValue } = res;

    const data = firstValue.valueOf();

    return data;
  }
);
export const fetchAllScNfts = createAsyncThunk(
  "pools/fetchAllScNfts",
  async (pool: IExistingPool) => {
    const poolType = new StructType("pool", [
      new FieldDefinition("creation_timestamp", "", new U64Type()),
      new FieldDefinition("creator", "", new AddressType()),
      new FieldDefinition("collection", "", new TokenIdentifierType()),
      new FieldDefinition("nr_of_nfts", "", new U32Type()),
      new FieldDefinition("reward_token", "", new BytesType()),
      new FieldDefinition("reward_amount", "", new BigUIntType()),
    ]);

    const poolStruct = new Struct(poolType, [
      new Field(
        new U64Value(new BigNumber(pool.timestam)),
        "creation_timestamp"
      ),
      new Field(new AddressValue(new Address(pool.creator)), "creator"),
      new Field(new TokenIdentifierValue(pool.collection), "collection"),
      new Field(new U32Value(new BigNumber(pool.nfts)), "nr_of_nfts"),
      new Field(BytesValue.fromUTF8(pool.token), "reward_token"),
      new Field(new BigUIntValue(new BigNumber(pool.rewards)), "reward_amount"),
    ]);

    const res = await scQuery("NftStakingPoolsWsp", "allPoolStakings", [
      poolStruct,
    ]);
    const { firstValue } = res;

    const data = firstValue.valueOf();

    return data;
  }
);
