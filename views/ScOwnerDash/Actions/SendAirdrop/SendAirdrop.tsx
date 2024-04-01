import { Center, Flex, Input, useEditable } from "@chakra-ui/react";
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
import { useAppSelector } from "../../../../shared/hooks/core/useRedux";
import useNumerizePools from "../../../../shared/hooks/tools/useNumerizePools";
import { selectRewardsTokens } from "../../../../shared/redux/slices/pools";
import { getInterface } from "../../../../shared/services/sc";
import {
  EGLDPayment,
  ESDTTransfer,
} from "../../../../shared/services/sc/calls";
import { formatTokenI } from "../../../../shared/utils/formatTokenIdentifier";
import { getTokenDetails } from "../../../../shared/utils/getTokenDetails";
import _ from 'lodash';
import { useEffect } from "react";

const validationSchema = yup.object({
  token: yup.string().required(),
  amount: yup.number().required(),
  pool: yup.number().required(),
});

const SendAirdrop = ({specificPool = ""}) => {
  const { pools: existingPools } = useNumerizePools();

  const { data: rewardsTokens } = useAppSelector(selectRewardsTokens);

  const formik = useFormik({
    initialValues: {
      token: "",
      amount: "",
      pool: specificPool
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

      if (values.token === "EGLD") {
        EGLDPayment(
          "NftStakingPoolsWsp",
          "sendAirdrop",
          Number(values.amount),
          [poolStruct]
        );
      } else {
        const tokenD = await getTokenDetails(values.token);
        if (tokenD) {
          ESDTTransfer({
            args: [poolStruct],
            contractAddr: getInterface("NftStakingPoolsWsp").simpleAddress,
            funcName: "sendAirdrop",
            token: {
              identifier: values.token,
              decimals: tokenD.decimals,
            },
            val: Number(values.amount),
            gasL: 600000000,
          });
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Center flexDir={"column"}>
        <Flex gap={2} p={4} flexDir="column">
          <Flex>
            <SelectDark
              onChange={formik.handleChange}
              name="token"
              isInvalid={formik.touched.token && Boolean(formik.errors.token)}
              border={"1px solid white"}
            >
              <>
                <OptionSelectDark>Token</OptionSelectDark>
                {rewardsTokens.map((t) => {
                  if (!t) {
                    return null;
                  }
                  return (
                    <OptionSelectDark key={t} value={t}>
                      {formatTokenI(t)}
                    </OptionSelectDark>
                  );
                })}
              </>
            </SelectDark>
          </Flex>

          <Input
            name="amount"
            placeholder="Amount"
            onChange={formik.handleChange}
            isInvalid={formik.touched.amount && Boolean(formik.errors.amount)}
          />
          
          {!specificPool &&
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
          }
        </Flex>
        <ActionButton my={2} type="submit">Send Airdrop</ActionButton>
      </Center>
    </form>
  );
};

export default SendAirdrop;
