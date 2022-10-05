import { Center, Flex, Input } from "@chakra-ui/react";
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
import { useFormik } from "formik";
import * as yup from "yup";
import { ActionButton } from "../../../../shared/components/tools/ActionButton";
import SelectDark, {
  OptionSelectDark,
} from "../../../../shared/components/ui/SelectDark";
import { useAppSelector } from "../../../../shared/hooks/core/useRedux";
import { useScTransaction } from "../../../../shared/hooks/core/useScTransaction";
import { NftStakingPoolsWsp } from "../../../../shared/services/sc";
import { ESDTTransfer, scCall } from "../../../../shared/services/sc/calls";
import {
  selectExistingPools,
  selectRewardsTokens,
} from "../../../../shared/slices/pools";
import { formatTokenI } from "../../../../shared/utils/formatTokenIdentifier";
import { getTokenDetails } from "../../../../shared/utils/getTokenDetails";
import { TxCb } from "../../../../shared/utils/txCallback";

const validationSchema = yup.object({
  token: yup.string().required(),
  amount: yup.number().required(),
  pool: yup.number().required(),
});

const SendAirdrop = () => {
  const existingPools = useAppSelector(selectExistingPools);
  const { data: rewardsTokens } = useAppSelector(selectRewardsTokens);

  const { triggerTx } = useScTransaction({
    cb: TxCb,
  });
  const formik = useFormik({
    initialValues: {
      token: "",
      amount: "",
      pool: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const index = Number(values.pool);
      const pool = existingPools.data[index];

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
        triggerTx(
          scCall(
            NftStakingPoolsWsp,
            "sendAirdrop",
            [poolStruct],
            undefined,
            values.amount
          )
        );
      } else {
        const tokenD = await getTokenDetails(values.token);
        if (tokenD) {
          triggerTx(
            ESDTTransfer(
              NftStakingPoolsWsp,
              "sendAirdrop",
              {
                identifier: values.token,
                decimals: tokenD.decimals,
              },
              Number(values.amount),
              [poolStruct]
            )
          );
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Center flexDir={"column"}>
        <Flex gap={4} mb={2} flexDir="column">
          <Flex gap={4} mb={2}>
            <Input
              name="amount"
              placeholder="Amount"
              onChange={formik.handleChange}
              isInvalid={formik.touched.amount && Boolean(formik.errors.amount)}
            />
            <SelectDark
              onChange={formik.handleChange}
              name="token"
              isInvalid={formik.touched.token && Boolean(formik.errors.token)}
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

          <SelectDark
            onChange={formik.handleChange}
            name="pool"
            minW="250px"
            isInvalid={formik.touched.pool && Boolean(formik.errors.pool)}
          >
            <>
              <OptionSelectDark value={""}>Pool</OptionSelectDark>
              {existingPools.data.map((pool, i) => {
                if (!pool.collection) {
                  return null;
                }
                return (
                  <OptionSelectDark key={i} value={i}>
                    {i + 1} - {formatTokenI(pool.collection)}
                  </OptionSelectDark>
                );
              })}
            </>
          </SelectDark>
        </Flex>
        <ActionButton type="submit">Send Airdrop</ActionButton>
      </Center>
    </form>
  );
};

export default SendAirdrop;
