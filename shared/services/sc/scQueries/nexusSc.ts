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
import BigNumber from "bignumber.js";
import { selectedNetwork } from "../../../../config/network";
import { store } from "../../../redux/store";
import { IExistingPool } from "../../../redux/types/pools.interface";
import { scQuery } from "../queries";
//fetch sc admin address from the contract or return sc address
export const fetchScAdminAddress = async () => {
  let adminAddress = selectedNetwork.contractAddr.nftsStaking;

  try {
    const data = await scQuery("NftStakingPoolsWsp", "getOwner", []);
    adminAddress = data.firstValue.valueOf();
  } catch (error) {
    console.log(error);
  }

  return adminAddress;
};

export const fetchNftRewards = async ([_key, pool, collection, nonce]: [
  string,
  IExistingPool,
  string,
  number
]) => {
  const userAdress = store.getState().settings.userAddress;
  const poolType = new StructType("pool", [
    new FieldDefinition("creation_timestamp", "", new U64Type()),
    new FieldDefinition("creator", "", new AddressType()),
    new FieldDefinition("collection", "", new TokenIdentifierType()),
    new FieldDefinition("nr_of_nfts", "", new U32Type()),
    new FieldDefinition("reward_token", "", new BytesType()),
    new FieldDefinition("reward_amount", "", new BigUIntType()),
  ]);

  const poolStruct = new Struct(poolType, [
    new Field(new U64Value(new BigNumber(pool.timestam)), "creation_timestamp"),
    new Field(new AddressValue(new Address(pool.creator)), "creator"),
    new Field(new TokenIdentifierValue(pool.collection), "collection"),
    new Field(new U32Value(new BigNumber(pool.nfts)), "nr_of_nfts"),
    new Field(BytesValue.fromUTF8(pool.token), "reward_token"),
    new Field(new BigUIntValue(new BigNumber(pool.rewards)), "reward_amount"),
  ]);

  const NftsStakingType = new StructType("nftstaking", [
    new FieldDefinition("address", "", new AddressType()),
    new FieldDefinition("nft_token", "", new TokenIdentifierType()),
    new FieldDefinition("nft_nonce", "", new U64Type()),
    new FieldDefinition("nft_pool", "", poolType),
  ]);

  const nftsStakingStruct = new Struct(NftsStakingType, [
    new Field(new AddressValue(new Address(userAdress)), "address"),
    new Field(new TokenIdentifierValue(collection), "nft_token"),
    new Field(new U64Value(new BigNumber(nonce)), "nft_nonce"),
    new Field(poolStruct, "nft_pool"),
  ]);

  const data = await scQuery("NftStakingPoolsWsp", "calcEstRewardableDays", [
    nftsStakingStruct,
  ]);
  return data.firstValue.valueOf().toNumber();
};
