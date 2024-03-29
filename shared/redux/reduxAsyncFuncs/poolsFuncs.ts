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
} from "@multiversx/sdk-core/out";
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
  const firstValue = res.values;

  const tokens = firstValue.valueOf()[2].valueOf().map((fee) => {
    return fee[0];
  });

  const resapitokens = await getFromAllTokens({
    identifiers: tokens.join(","),
  });
  const tokensDetails = [...resapitokens.data, EgldToken];

  const data: IPoolStats = {
    feesCollected: firstValue.valueOf()[2].valueOf().map((fee) => {
      const index = tokensDetails.findIndex(
        (token) => token.identifier === fee[0],
      );
      if (index !== -1) {
        return {
          token: fee[0],
          amount: fee[1].toNumber(),
          tokenDetials: tokensDetails[index],
        };
      }
    }),
    poolsCreated: firstValue.valueOf()[0].valueOf().toNumber(),
    nftStaked: firstValue.valueOf()[1].valueOf().toNumber(),
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
        timestam: pool[0].creation_timestamp.toNumber(),
        creator: pool[0].creator.bech32(),
        collection: pool[0].collection,
        nfts: pool[0].nr_of_nfts.toNumber(),
        token: pool[0].reward_token,
        rewards: pool[0].reward_amount.toNumber(),
        poolName: pool[1].toString(),
        nftsNow: pool[2].toNumber(),
        poolDuration: pool[3].toNumber(),
        url: pool[4].toString(),
        isStakingDisabled: pool[5]
      };
      return data;
    });

    return data;
  },
);

export const fetchUserStaked = createAsyncThunk(
  "pools/fetchUserStaked",
  async ({ address, page, maxNftsPerPage }: { address: string; page: number, maxNftsPerPage?: number }) => {
    const res = await scQuery("NftStakingPoolsWsp", "getUserStaked", [
      new AddressValue(new Address(address)),
      new BigUIntValue(new BigNumber(page)),
      new BigUIntValue(new BigNumber(maxNftsPerPage ? maxNftsPerPage : 8)),
    ]);

    const { firstValue, secondValue } = res;

    const data: IStaked[] = secondValue.valueOf().map((nft) => {
      const nftData: IStaked = {
        address: nft[0].address.bech32(),
        nonce: nft[0].nft_nonce.toNumber(),
        nftPool: {
          timestam: nft[0].nft_pool.creation_timestamp.toNumber(),
          creator: nft[0].nft_pool.creator.bech32(),
          collection: nft[0].nft_pool.collection,
          nfts: nft[0].nft_pool.nr_of_nfts.toNumber(),
          poolDuration: nft[1].toNumber(),
          token: nft[0].nft_pool.reward_token,
          rewards: nft[0].nft_pool.reward_amount.toNumber(),
          isStakingDisabled: nft[0].nft_pool.isStakingDisabled
        },
        token: nft[0].nft_token,
        name: nft[2].toString(),
        url: nft[3].toString(),
        estimatedRewards: nft[4].toNumber(),
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
        (token) => token.identifier === stakedInfo.nftPool.token,
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
        pageCount: firstValue.valueOf().toNumber(),
      },
    };
  },
);

export const fetchIsNftCreator = createAsyncThunk(
  "pools/fetchIsNftCreator",
  async (address: string) => {
    const res = await scQuery(
      "NftStakingPoolsWsp",
      "getIsNftCreatorAndScOwner",
      [new AddressValue(new Address(address))],
    );
    const { firstValue } = res;
    
    const forceAdmin = process.env.NEXT_PUBLIC_IS_ADMIN || "false";
    const forceNftCreator = process.env.NEXT_PUBLIC_IS_CREATOR || "false";

    const data: { isNftCreator: boolean; isAdmin: boolean } = {
      isNftCreator:
        adminAddresses.includes(address) ||
        (forceNftCreator == "true" ? forceNftCreator === "true" : firstValue.valueOf().field0),
      isAdmin:
        adminAddresses.includes(address) ||
        (forceAdmin == "true"  ? forceAdmin === "true" : firstValue.valueOf().field1),
    };

    return {
      isNftCreator: data.isAdmin || data.isNftCreator,
      isAdmin: data.isAdmin,
    };
  },
);

export const fetchNonWithdrawnCollections = createAsyncThunk(
  "pools/fetchNonWithdrawnCollections",
  async () => {
    const res = await scQuery(
      "NftStakingPoolsWsp",
      "getNonWithdrawnCollections",
    );
    const { firstValue } = res;

    const data = firstValue.valueOf();

    return data;
  },
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
  },
);

// export const fetchIsUserCreator = createAsyncThunk(
//   "pools/fetchRegistrationInfo",
//   async ({ address }: { address: string; }) => {
//     const res = await scQuery("NftStakingPoolsWsp", "getIsUserCreator", [
//       new AddressValue(new Address(address)),
//     ]);
//     const { firstValue } = res;

//     const data = firstValue.valueOf();

//     return {
//       isUserCreator: data.field0,
//     };
//   },
// );

export const fetchAllowedRegistrationTokens = createAsyncThunk(
  "pools/fetchAllowedRegistrationTokens",
  async () => {
    const res = await scQuery(
      "NftStakingPoolsWsp",
      "allowedRegistrationTokens",
    );
    const { firstValue } = res;

    const data = firstValue.valueOf();

    return data;
  },
);
export const fetchAllowedRewardTokens = createAsyncThunk(
  "pools/fetchAllowedRewardTokens",
  async () => {
    const res = await scQuery("NftStakingPoolsWsp", "allowedRewardTokens");
    const { firstValue } = res;

    const data = firstValue.valueOf();

    return data;
  },
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
  },
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
  },
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
  },
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
        "creation_timestamp",
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
  },
);
