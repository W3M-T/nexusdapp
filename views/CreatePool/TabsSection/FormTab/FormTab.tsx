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
import { useEffect } from "react";
import * as yup from "yup";
import { ActionButton } from "../../../../shared/components/tools/ActionButton";
import { CardWrapper } from "../../../../shared/components/ui/CardWrapper";
import { useAppSelector } from "../../../../shared/hooks/core/useRedux";
import { useScTransaction } from "../../../../shared/hooks/core/useScTransaction";
import { selectCreatePool } from "../../../../shared/redux/slices/pools";
import { getNft } from "../../../../shared/services/rest/axiosEldron";
import { NftStakingPoolsWsp } from "../../../../shared/services/sc";
import { ESDTTransfer, scCall } from "../../../../shared/services/sc/calls";
import { getTokenDetails } from "../../../../shared/utils/getTokenDetails";
import { TxCb } from "../../../../shared/utils/txCallback";
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
    onSubmit: async (values) => {
      const nft = await getNft(values.collection.collection + "-01");

      const nftsNumber = values.nftsNumber.trim();
      const token = values.token.trim();
      const dayliRewards = values.dayliRewards.trim();

      const amountToSend = new BigNumber(nftsNumber)
        .multipliedBy(dayliRewards)
        .multipliedBy(30)
        .toNumber();

      const args = [
        BytesValue.fromUTF8(values.collection.collection),
        new U32Value(new BigNumber(nftsNumber)),
        BytesValue.fromUTF8(token),
        new BigUIntValue(
          new BigNumber(dayliRewards).multipliedBy(Math.pow(10, 18))
        ),
        BytesValue.fromUTF8(values.collection.name),
        BytesValue.fromUTF8(nft?.data?.media[0]?.url || ""),
      ];
      if (token === "EGLD") {
        triggerTx(
          scCall(
            NftStakingPoolsWsp,
            "createPool",
            args,
            undefined,
            amountToSend
          )
        );
      } else {
        const tokenD = await getTokenDetails(token);
        if (tokenD) {
          triggerTx(
            ESDTTransfer(
              NftStakingPoolsWsp,
              "createPool",
              { identifier: token, decimals: tokenD.decimals },
              amountToSend,
              args
            )
          );
        }
      }
    },
  });

  useEffect(() => {
    localStorage.setItem("poolcreationPhase", "3");
  }, []);

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
                <Input
                  color="gray.400"
                  bg="#0F1535"
                  border="0.5px solid"
                  borderColor="#E2E8F04D"
                  borderRadius="15px"
                  placeholder="Token Identifier..."
                  fontSize="xs"
                  name="token"
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.token && Boolean(formik.errors.token)
                  }
                />
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
                  ? new BigNumber(formik.values.nftsNumber)
                      .multipliedBy(formik.values.dayliRewards)
                      .multipliedBy(30)
                      .toNumber()
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
                  Deposit and Create pool
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
