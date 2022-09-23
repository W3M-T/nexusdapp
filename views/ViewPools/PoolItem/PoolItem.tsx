import { Box, Center, Flex, Text } from "@chakra-ui/react";
import NextImg from "../../../components/ui/NextImg";
import { IExistingPool } from "../../../redux/types/pools.interface";
import { formatBalance } from "../../../utils/formatBalance";
import { formatTokenI } from "../../../utils/formatTokenIdentifier";
interface IProps {
  pool: IExistingPool;
}
const PoolItem = ({ pool }: IProps) => {
  const date = new Date(pool.timestam * 1000);
  return (
    <Flex
      border="1px solid white"
      borderRadius={"lg"}
      p={5}
      gap={8}
      minW="300px"
      justifyContent={"space-between"}
    >
      <Center h="full">
        <NextImg
          alt={"nft"}
          width={"100px"}
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
      </Center>
      <Center flexDir={"column"} alignItems="flex-start">
        <Text mb={2} fontWeight="bold" fontSize={"2xl"}>
          {formatTokenI(pool.collection)}
        </Text>
        <Flex flexDir={"column"} gap={1}>
          <Text>
            <Box as="span" fontWeight={"bold"}>
              {" "}
              Daily Rewards :
            </Box>{" "}
            {formatBalance({ balance: pool.rewards })}{" "}
            {formatTokenI(pool.token)}{" "}
          </Text>
          <Text>
            {" "}
            <Box as="span" fontWeight={"bold"}>
              Created :{" "}
            </Box>{" "}
            {date.toLocaleDateString("en-US")}{" "}
          </Text>
        </Flex>
        <Text>
          {" "}
          <Box as="span" fontWeight={"bold"}>
            Total Nfts :{" "}
          </Box>{" "}
          {pool.nfts}{" "}
        </Text>
      </Center>
    </Flex>
  );
};

export default PoolItem;
