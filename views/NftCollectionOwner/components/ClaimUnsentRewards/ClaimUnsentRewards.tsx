import { Box, Center, Flex, Tooltip } from "@chakra-ui/react";
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
import { addDays } from "date-fns";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { ActionButton } from "../../../../shared/components/tools/ActionButton";
import SelectDark, {
  OptionSelectDark,
} from "../../../../shared/components/ui/SelectDark";
import { useAppSelector } from "../../../../shared/hooks/core/useRedux";
import { useScTransaction } from "../../../../shared/hooks/core/useScTransaction";
import { selectExistingPools } from "../../../../shared/redux/slices/pools";
import { selectUserAddress } from "../../../../shared/redux/slices/settings";
import { NftStakingPoolsWsp } from "../../../../shared/services/sc";
import { scCall } from "../../../../shared/services/sc/calls";
import { formatTokenI } from "../../../../shared/utils/formatTokenIdentifier";
import { TxCb } from "../../../../shared/utils/txCallback";
const validationSchema = yup.object({
  pool: yup.number().required(),
});

const ClaimUnsentRewards = () => {
  const [validateClaim, setValidateClaim] = useState(false);
  const pools = useAppSelector(selectExistingPools);

  const address = useAppSelector(selectUserAddress);
  const existingPools = pools.data.filter((pool) => pool.creator === address);
  const { triggerTx } = useScTransaction({
    cb: TxCb,
  });
  const formik = useFormik({
    initialValues: {
      pool: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const index = Number(values.pool);
      const pool = existingPools[index];
      if (validatePoolByDate(pool)) {
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

        triggerTx(
          scCall(
            NftStakingPoolsWsp,
            "claimUnsentRewards",
            [poolStruct],
            50000000
          )
        );
      }
    },
  });

  useEffect(() => {
    const poolIndexStr = formik.values.pool;
    if (poolIndexStr) {
      const index = Number(poolIndexStr);
      const p = existingPools[index];
      const validClaim = validatePoolByDate(p);
      setValidateClaim(validClaim);
    }
  }, [existingPools, formik.values.pool]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Center flexDir={"column"}>
        <Flex mb={2} flexDir="column">
          <SelectDark
            onChange={formik.handleChange}
            name="pool"
            minW="250px"
            isInvalid={formik.touched.pool && Boolean(formik.errors.pool)}
          >
            <>
              <OptionSelectDark value={""}>Pool</OptionSelectDark>
              {existingPools.map((pool, i) => {
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
        <Tooltip
          label="You can claim them after 30 days from the creation."
          isDisabled={validateClaim}
        >
          <Box>
            <ActionButton type="submit" disabled={!validateClaim}>
              Claim unsent Rewards
            </ActionButton>
          </Box>
        </Tooltip>
      </Center>
    </form>
  );
};

export default ClaimUnsentRewards;

const validatePoolByDate = (p) => {
  const date = new Date(p.timestam * 1000);

  const dateInAMonth = addDays(date, 30);
  const today = new Date();

  let validClaim = false;

  if (dateInAMonth < today) {
    validClaim = true;
  } else {
    validClaim = false;
  }

  return validClaim;
};
