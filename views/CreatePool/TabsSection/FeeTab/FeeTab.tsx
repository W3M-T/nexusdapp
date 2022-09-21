/* eslint-disable react/no-unescaped-entities */

// Chakra imports
import { Box, Center, Flex, Text } from "@chakra-ui/react";

// Custom components

// Icons
import { ActionButton } from "../../../../components/tools/ActionButton";
import { CardWrapper } from "../../../../components/ui/CardWrapper";

const FeeTab = ({
  setCheckboxes,
  checkboxes,
  bgPrevButton,
  formTab,
  verifyTab,
}) => {
  return (
    <CardWrapper bg="linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)">
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
            Elrond Apes - 120G07 collection verified!
          </Text>
          <Text color="gray.400" fontWeight="500" fontSize="sm">
            By registering you can create as many pools as you wish for this
            collection. Registration fee is{" "}
            <Box as="span" fontWeight={"bold"} textDecoration="underline">
              {" "}
              15 EGLD
            </Box>
            .
          </Text>
        </Flex>
      </Box>
      <Box>
        <Center>
          <ActionButton>Pay now</ActionButton>
        </Center>
      </Box>
    </CardWrapper>
  );
};

export default FeeTab;
