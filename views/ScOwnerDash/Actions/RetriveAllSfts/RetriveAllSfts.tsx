import { Flex } from "@chakra-ui/react";
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
import BigNumber from "bignumber.js";
import { useFormik } from "formik";
import * as yup from "yup";
import { ActionButton } from "../../../../shared/components/tools/ActionButton";
import SelectDark, {
  OptionSelectDark,
} from "../../../../shared/components/ui/SelectDark";
import useNumerizePools from "../../../../shared/hooks/tools/useNumerizePools";
import { IExistingPool } from "../../../../shared/redux/types/pools.interface";
import { getFromAllNFTs } from "../../../../shared/services/rest/axiosEldron";
import { scCall } from "../../../../shared/services/sc/calls";
import { scQuery } from "../../../../shared/services/sc/queries";
import { createIndentifierByCollectionAndNonce } from "../../../../shared/utils/formatTokenIdentifier";

const validationSchema = yup.object({
  pool: yup.number().required(),
});

const RetriveAllSfts = () => {
  const { pools: existingPools } = useNumerizePools();

  const formik = useFormik({
    initialValues: {
      pool: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const index = Number(values.pool);
      const pool = existingPools[index];

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
        new Field(
          new BigUIntValue(new BigNumber(pool.rewards)),
          "reward_amount"
        ),
      ]);

      const res = await scQuery("NftStakingPoolsWsp", "allPoolStakings", [
        poolStruct,
      ]);
      const scNfts = res.firstValue.valueOf();

      const nftsIndetifiersArr: string[] = scNfts.map((scNft) =>
        createIndentifierByCollectionAndNonce(
          scNft.nft_token,
          scNft.nft_nonce.toNumber()
        )
      );

      const newArrOfNftsArr = [];
      let tempArr = [];
      let count = 0;
      const numberOfNft = 100;

      nftsIndetifiersArr.forEach((nftI, i) => {
        tempArr.push(nftI);
        count++;

        if (tempArr.length === numberOfNft) {
          newArrOfNftsArr.push(tempArr);
          tempArr = [];
        } else {
          if (nftsIndetifiersArr.length - count < numberOfNft) {
            if (i === nftsIndetifiersArr.length - 1) {
              if (tempArr.length !== 1) {
                newArrOfNftsArr.push(tempArr);
              }
            }
          }
        }
      });

      const elrondNFts = [];
      for (let i = 0; i < newArrOfNftsArr.length; i++) {
        const nftsIArr = newArrOfNftsArr[i];

        const { data: elronfNftsData } = await getFromAllNFTs({
          identifiers: nftsIArr.join(","),
          size: 100,
          extraQuery: "?fields=type,identifier",
        });

        elrondNFts.push(elronfNftsData);
      }

      const elrondTypesNftsArr = elrondNFts.flatMap((nft) => nft);

      const elrondNftsDataAndScData = elrondTypesNftsArr.map((nft, i) => {
        const scData = scNfts.find(
          (n) =>
            createIndentifierByCollectionAndNonce(
              n.nft_token,
              n.nft_nonce.toNumber()
            ) === nft.identifier
        );
        return {
          ...nft,
          ...scData,
        };
      });

      const filterNfts = elrondNftsDataAndScData.filter(
        (nft) => nft.type === "SemiFungibleESDT"
      );

      const prepareNftsToSend = filterNfts.map((nft) => {
        const pool = nft.nft_pool;

        const data: IExistingPool = {
          timestam: pool.creation_timestamp.toNumber(),
          creator: pool.creator.bech32(),
          collection: pool.collection,
          nfts: pool.nr_of_nfts.toNumber(),
          token: pool.reward_token,
          rewards: pool.reward_amount.toNumber(),
        };

        const poolStruct = new Struct(poolType, [
          new Field(
            new U64Value(new BigNumber(data.timestam)),
            "creation_timestamp"
          ),
          new Field(new AddressValue(new Address(data.creator)), "creator"),
          new Field(new TokenIdentifierValue(data.collection), "collection"),
          new Field(new U32Value(new BigNumber(data.nfts)), "nr_of_nfts"),
          new Field(BytesValue.fromUTF8(data.token), "reward_token"),
          new Field(
            new BigUIntValue(new BigNumber(data.rewards)),
            "reward_amount"
          ),
        ]);

        const nftToSendType = new StructType("nftToSend", [
          new FieldDefinition("address", "", new AddressType()),
          new FieldDefinition("nft_token", "", new TokenIdentifierType()),
          new FieldDefinition("nft_nonce", "", new U64Type()),
          new FieldDefinition(
            "nft_pool",
            "",
            new StructType("pool", [
              new FieldDefinition("creation_timestamp", "", new U64Type()),
              new FieldDefinition("creator", "", new AddressType()),
              new FieldDefinition("collection", "", new TokenIdentifierType()),
              new FieldDefinition("nr_of_nfts", "", new U32Type()),
              new FieldDefinition("reward_token", "", new BytesType()),
              new FieldDefinition("reward_amount", "", new BigUIntType()),
            ])
          ),
        ]);

        const nftToSendStruct = new Struct(nftToSendType, [
          new Field(
            new AddressValue(new Address(nft.address.bech32())),
            "address"
          ),
          new Field(new TokenIdentifierValue(nft.nft_token), "nft_token"),
          new Field(
            new U64Value(new BigNumber(nft.nft_nonce.toNumber())),
            "nft_nonce"
          ),
          new Field(poolStruct, "nft_pool"),
        ]);
        return nftToSendStruct;
      });

      scCall("NftStakingPoolsWsp", "returnSfts", prepareNftsToSend);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex flexDir={"column"} gap={2}>
        <SelectDark
          onChange={formik.handleChange}
          name="pool"
          minW="250px"
          isInvalid={formik.touched.pool && Boolean(formik.errors.pool)}
        >
          <>
            <OptionSelectDark value={""}>Pool</OptionSelectDark>
            {existingPools.map((pool, i) => {
              return (
                <OptionSelectDark key={i} value={i}>
                  {i + 1} - {pool.poolName}
                </OptionSelectDark>
              );
            })}
          </>
        </SelectDark>

        <ActionButton type="submit">Retrive all sfts</ActionButton>
      </Flex>
    </form>
  );
};

export default RetriveAllSfts;
