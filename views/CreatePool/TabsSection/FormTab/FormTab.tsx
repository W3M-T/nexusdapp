/* eslint-disable react/no-unescaped-entities */

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BigUIntValue, BytesValue, U32Value } from "@elrondnetwork/erdjs/out";
import BigNumber from "bignumber.js";

// Custom components

// Icons
import { useFormik } from "formik";
import * as yup from "yup";
import { ActionButton } from "../../../../components/tools/ActionButton";
import { CardWrapper } from "../../../../components/ui/CardWrapper";
import SelectDark, {
  OptionSelectDark,
} from "../../../../components/ui/SelectDark";
import { tokensPools } from "../../../../constants/tokens";
import { useAppSelector } from "../../../../hooks/core/useRedux";
import { useScTransaction } from "../../../../hooks/core/useScTransaction";
import { selectCreatePool } from "../../../../redux/slices/pools";
import { NftStakingPoolsWsp } from "../../../../services/sc";
import { scCall } from "../../../../services/sc/calls";
import { formatTokenI } from "../../../../utils/formatTokenIdentifier";
import { TxCb } from "../../../../utils/txCallback";

const validationSchema = yup.object({
  nftsNumber: yup.number().required(),
  dayliRewards: yup.number().required(),
  token: yup.string().required(),
});

interface IProps {
  activeFeeTab: () => void;
}

const FormTab = ({ activeFeeTab }: IProps) => {
  const { collection: collection } = useAppSelector(selectCreatePool);
  const { triggerTx } = useScTransaction({
    cb: TxCb,
  });
  const formik = useFormik({
    initialValues: {
      collection: collection,
      nftsNumber: "",
      token: "",
      dayliRewards: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.token === "EGLD") {
        triggerTx(
          scCall(
            NftStakingPoolsWsp,
            "createPool",
            [
              BytesValue.fromUTF8(values.collection.collection),
              new U32Value(new BigNumber(values.nftsNumber)),
              BytesValue.fromUTF8(values.token),
              new BigUIntValue(new BigNumber(values.dayliRewards)),
              BytesValue.fromUTF8(values.collection.name),
            ],
            80000000,
            Number(values.nftsNumber) * Number(values.dayliRewards) * 30
          )
        );
      }
    },
  });

  return (
    <CardWrapper>
      <Box mb="40px">
        <Flex
          direction="column"
          align="center"
          justify="center"
          textAlign="center"
          w="80%"
          mx="auto"
        >
          <Text fontSize="lg" fontWeight="bold" mb="4px">
            Pool Creation Form
          </Text>
        </Flex>
      </Box>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Flex direction="column" w="100%">
            <Stack direction="column" spacing="20px">
              <FormControl>
                <FormLabel fontWeight="bold" fontSize="xs">
                  Nft Collection name
                </FormLabel>
                <Input
                  color="gray.400"
                  bg="#0F1535"
                  border="0.5px solid"
                  borderColor="#E2E8F04D"
                  borderRadius="15px"
                  placeholder="eg. "
                  fontSize="xs"
                  value={collection.collection}
                  readOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold" fontSize="xs">
                  Number of NFTs
                </FormLabel>
                <Input
                  color="gray.400"
                  bg="#0F1535"
                  border="0.5px solid"
                  borderColor="#E2E8F04D"
                  borderRadius="15px"
                  placeholder="eg. 220"
                  fontSize="xs"
                  name="nftsNumber"
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.nftsNumber &&
                    Boolean(formik.errors.nftsNumber)
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold" fontSize="xs">
                  Reward token
                </FormLabel>
                <SelectDark
                  borderRadius="15px"
                  borderColor="#E2E8F04D"
                  mb={0}
                  onChange={formik.handleChange}
                  name="token"
                  isInvalid={
                    formik.touched.token && Boolean(formik.errors.token)
                  }
                >
                  <OptionSelectDark> Token </OptionSelectDark>
                  <>
                    {tokensPools.map((t) => {
                      if (!t) {
                        return null;
                      }
                      return (
                        <OptionSelectDark
                          key={t.identifier}
                          value={t.identifier}
                        >
                          {formatTokenI(t.identifier)}
                        </OptionSelectDark>
                      );
                    })}
                  </>
                </SelectDark>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold" fontSize="xs">
                  Daily rewards
                </FormLabel>
                <Input
                  color="gray.400"
                  bg="#0F1535"
                  border="0.5px solid"
                  borderColor="#E2E8F04D"
                  borderRadius="15px"
                  placeholder="eg. 100"
                  fontSize="xs"
                  name="dayliRewards"
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.dayliRewards &&
                    Boolean(formik.errors.dayliRewards)
                  }
                />
              </FormControl>
            </Stack>

            <Box mt={8} mb={4}>
              <Heading fontSize={"md"}>
                Amount to be paid :{" "}
                {Number(formik.values.nftsNumber) &&
                Number(formik.values.dayliRewards)
                  ? Number(formik.values.nftsNumber) *
                    Number(formik.values.dayliRewards) *
                    30
                  : 0}
              </Heading>
            </Box>
            <Flex justify="space-between">
              <Button
                variant="no-hover"
                bg={"white"}
                alignSelf="flex-end"
                mt="24px"
                w={{ sm: "75px", lg: "100px" }}
                h="35px"
                onClick={activeFeeTab}
              >
                <Text fontSize="xs" color="#313860" fontWeight="bold">
                  PREV
                </Text>
              </Button>
              <ActionButton
                bg="dappTemplate.color2.base"
                alignSelf="flex-end"
                mt="24px"
                h="35px"
                type="submit"
              >
                <Text fontSize="xs" color="#fff" fontWeight="bold">
                  Pay & Create Pool
                </Text>
              </ActionButton>
            </Flex>
          </Flex>
        </form>
      </Box>
    </CardWrapper>
  );
};

export default FormTab;
