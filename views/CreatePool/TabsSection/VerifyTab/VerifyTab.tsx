/* eslint-disable react/no-unescaped-entities */

// Chakra imports
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ActionButton } from "../../../../components/tools/ActionButton";
import { CardWrapper } from "../../../../components/ui/CardWrapper";

// Custom components

// Icons

const UserTab = ({ feeTab }) => {
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
          <Flex direction={{ sm: "column", md: "row" }} w="100%" mb="24px">
            <Stack direction="column" spacing="20px" w="100%">
              <FormControl mb={6}>
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
                />
              </FormControl>
              <ActionButton>Verify</ActionButton>
            </Stack>
          </Flex>
          <ActionButton
            bg="dappTemplate.color2.base"
            alignSelf="flex-end"
            mt="24px"
            h="35px"
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
