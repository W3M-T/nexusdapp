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
import { formatTokenI } from "../../../../utils/formatTokenIdentifier";

const validationSchema = yup.object({
  amount: yup.number().required(),
  token: yup.string().required(),
});

const FormTab = ({ bgPrevButton, feeTab }) => {
  const formik = useFormik({
    initialValues: {
      amount: "",
      token: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
                value={"Elrond Apes - 12G07"}
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
              >
                <>
                  {tokensPools.map((t) => {
                    if (!t) {
                      return null;
                    }
                    return (
                      <OptionSelectDark key={t.identifier} value={t.identifier}>
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
              />
            </FormControl>
          </Stack>
          <Box mt={8} mb={4}>
            <Heading fontSize={"md"}>Amount to be paid : {5600}</Heading>
          </Box>
          <Flex justify="space-between">
            <Button
              variant="no-hover"
              bg={bgPrevButton}
              alignSelf="flex-end"
              mt="24px"
              w={{ sm: "75px", lg: "100px" }}
              h="35px"
              onClick={() => feeTab.current.click()}
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
            >
              <Text fontSize="xs" color="#fff" fontWeight="bold">
                Pay & Create Pool
              </Text>
            </ActionButton>
          </Flex>
        </Flex>
      </Box>
    </CardWrapper>
  );
};

export default FormTab;
