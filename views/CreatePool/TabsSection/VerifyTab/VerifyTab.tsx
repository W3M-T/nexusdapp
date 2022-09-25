// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable react/no-unescaped-entities */

// Chakra imports
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { ActionButton } from "../../../../components/tools/ActionButton";
import { CardWrapper } from "../../../../components/ui/CardWrapper";
import { useAppSelector } from "../../../../hooks/core/useRedux";
import { selectUserAddress } from "../../../../redux/slices/settings";
import { getCollectionDetails } from "../../../../services/rest/axiosEldron";
const validationSchema = yup.object({
  collection: yup.string().required().min(5),
});

const UserTab = ({ feeTab }) => {
  const [status, setstatus] = useState<{ status: string; message: string }>();
  const address = useAppSelector(selectUserAddress);
  const formik = useFormik({
    initialValues: {
      collection: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setstatus(null);
      if (values.collection) {
        try {
          const res = await getCollectionDetails(values.collection);
          const collectionDetails = res.data;
          if (collectionDetails.owner === address) {
            // localStorage.setItem("collection-verificacion");
            setstatus({
              status: "success",
              message: "Already verified !",
            });
          } else {
            setstatus({
              status: "error",
              message: "Verificaion failed !",
            });
          }
          console.log(res.data);
        } catch (error) {
          console.log("error", error);
          console.log("error?.message", error?.message);

          if (error?.response?.data?.message) {
            setstatus({
              status: "error",
              message: error?.response?.data?.message,
            });
          } else {
            setstatus({
              status: "error",
              message: "Verificaion failed !",
            });
          }
        }
        console.log(res.data);
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
            We need to verify the nft collection to continue.
          </Text>
        </Flex>
      </Box>

      <Box>
        <Flex direction="column" w="100%">
          <Flex direction={"column"} w="100%" mb="24px">
            <Box w="full" as={"form"} onSubmit={formik.handleSubmit}>
              <Stack direction="column" spacing="20px" w="100%">
                <FormControl mb={2}>
                  <FormLabel fontSize="xs" fontWeight="bold">
                    NFT Collection
                  </FormLabel>
                  <Input
                    color="gray.400"
                    bg="#0F1535"
                    border="0.5px solid"
                    borderColor="#E2E8F04D"
                    borderRadius="15px"
                    placeholder="eg. ElrondApes-12G07"
                    fontSize="xs"
                    name="collection"
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.collection &&
                      Boolean(formik.errors.collection)
                    }
                  />
                </FormControl>
                <ActionButton type="submit">Verify</ActionButton>
              </Stack>
            </Box>
            {status && (
              <Box mt={8}>
                <Alert status={status.status} borderRadius="15px">
                  <AlertIcon />
                  {status.message}
                </Alert>
              </Box>
            )}
          </Flex>
          <ActionButton
            bg="dappTemplate.color2.base"
            alignSelf="flex-end"
            mt="24px"
            h="35px"
            disabled={!status || status.status === "error"}
            onClick={() => feeTab.current.click()}
          >
            <Text fontSize="xs" color="#fff" fontWeight="bold">
              NEXT
            </Text>
          </ActionButton>
        </Flex>
      </Box>
    </CardWrapper>
  );
};

export default UserTab;
