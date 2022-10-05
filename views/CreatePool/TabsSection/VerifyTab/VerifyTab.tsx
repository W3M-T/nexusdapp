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
import * as yup from "yup";
import { ActionButton } from "../../../../components/tools/ActionButton";
import { CardWrapper } from "../../../../components/ui/CardWrapper";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/core/useRedux";
import {
  selectCreatePool,
  setCreatePoolCollection,
  setCreatePoolPahe1,
} from "../../../../redux/slices/pools";
import { selectUserAddress } from "../../../../redux/slices/settings";
import { getCollectionDetails } from "../../../../services/rest/axiosEldron";
const validationSchema = yup.object({
  collection: yup.string().required().min(5),
});

interface IProps {
  activeFeeTab: () => void;
}

const UserTab = ({ activeFeeTab }: IProps) => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);
  const { phase1 } = useAppSelector(selectCreatePool);

  const formik = useFormik({
    initialValues: {
      collection: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(setCreatePoolPahe1(null));
      if (values.collection) {
        try {
          const res = await getCollectionDetails(values.collection);
          const collectionDetails = res.data;
          console.log("owner", collectionDetails.owner);
          console.log("address", address);
          if (collectionDetails.owner === address) {
            // localStorage.setItem("collection-verificacion");\
            const succesObj = {
              status: "success",
              message: "Verified!",
            };
            dispatch(setCreatePoolPahe1(succesObj));
            dispatch(setCreatePoolCollection(collectionDetails));
          } else {
            dispatch(
              setCreatePoolPahe1({
                status: "error",
                message: "Verificaion failed!",
              })
            );
          }
          console.log(res.data);
        } catch (error) {
          console.log("error", error);

          if (error?.response?.data?.message) {
            dispatch(
              setCreatePoolPahe1({
                status: "error",
                message: error?.response?.data?.message,
              })
            );
          } else {
            dispatch(
              setCreatePoolPahe1({
                status: "error",
                message: "Verificaion failed!",
              })
            );
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
            {phase1 !== null && (
              <Box mt={8}>
                <Alert status={phase1.status} borderRadius="15px">
                  <AlertIcon />
                  {phase1.message}
                </Alert>
              </Box>
            )}
          </Flex>
          <ActionButton
            bg="dappTemplate.color2.base"
            alignSelf="flex-end"
            mt="24px"
            h="35px"
            disabled={!phase1 || phase1.status === "error"}
            onClick={activeFeeTab}
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
