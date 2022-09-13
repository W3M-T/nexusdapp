import { Box, Center, Flex, Text } from "@chakra-ui/react";
import NextImg from "../../../components/ui/NextImg";

const PoolItem = () => {
  return (
    <Flex
      border="1px solid white"
      borderRadius={"lg"}
      p={5}
      gap={8}
      minW="300px"
      justifyContent={"space-between"}
    >
      <Box>
        <NextImg
          alt={"nft"}
          width={"80px"}
          sx={{
            span: {
              borderRadius: "full",
            },
          }}
          src={
            "https://media.xoxno.com/nftmedia/MAFIA-bd0abc/MAFIA-bd0abc-0517.avif"
          } // use normal <img> attributes as props
          nextProps={{
            height: 490,
            width: 490,
          }}
        />
      </Box>
      <Center flexDir={"column"}>
        <Text mb={3} fontWeight="bold">
          Pool name 1
        </Text>
        <Text>10 per day</Text>
      </Center>
    </Flex>
  );
};

export default PoolItem;
