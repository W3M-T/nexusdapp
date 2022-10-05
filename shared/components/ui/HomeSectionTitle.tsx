import { Box, Text } from "@chakra-ui/react";

interface HomeSectionTitleProps {
  title: string;
}

export const HomeSectionTitle = ({ title }: HomeSectionTitleProps) => {
  return (
    <Text
      as="h2"
      fontSize={{ base: "5xl", lg: "7xl" }}
      fontWeight="black"
      mb={16}
      textAlign="center"
    >
      {title}{" "}
      <Box
        as="span"
        width={5}
        height={5}
        display="inline-block"
        backgroundColor="dappTemplate.color3.base"
      />
    </Text>
  );
};
