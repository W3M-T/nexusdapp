/* eslint-disable react/no-unescaped-entities */

// Chakra imports
import { Flex, Text } from "@chakra-ui/react";

// Custom components

const TitleSection = () => {
  return (
    <Flex direction="column" textAlign="center" mb={{ sm: "25px", md: "45px" }}>
      <Text
        fontSize={{ sm: "2xl", md: "3xl", lg: "4xl" }}
        fontWeight="bold"
        mb="8px"
      >
        Nft Pool Creation
      </Text>
      <Text color="white" fontWeight="500" fontSize={{ sm: "sm", md: "lg" }}>
        This information will only be used for the purpose of creating the nft
        pool.
      </Text>
    </Flex>
  );
};

export default TitleSection;
