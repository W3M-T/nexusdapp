import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { ActionButton } from "../../../components/tools/ActionButton";
import NextImg from "../../../components/ui/NextImg";
import { useScTransaction } from "../../../hooks/core/useScTransaction";
import { IExistingPool } from "../../../redux/types/pools.interface";
import { formatBalance } from "../../../utils/formatBalance";
import { formatTokenI } from "../../../utils/formatTokenIdentifier";
import { TxCb } from "../../../utils/txCallback";
interface IProps {
  pool: IExistingPool;
}
const PoolItem = ({ pool }: IProps) => {
  const { triggerTx } = useScTransaction({
    cb: TxCb,
  });
  const handleStake = () => {
    // triggerTx(ESDTNFTTransfer("stakeNft","", 1,  pool.))
  };
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
          src={pool.url} // use normal <img> attributes as props
          nextProps={{
            height: 490,
            width: 490,
          }}
        />
      </Center>
      <Center flexDir={"column"} alignItems="flex-start">
        <Text mb={2} fontWeight="bold" fontSize={"2xl"}>
          {pool.poolName}
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
        <Text mb={2}>
          {" "}
          <Box as="span" fontWeight={"bold"}>
            Total Nfts :{" "}
          </Box>{" "}
          {pool.nftsNow} / {pool.nfts}{" "}
        </Text>
        <ActionButton
          borderRadius={"full"}
          fontSize="xs"
          py={1}
          onClick={handleStake}
        >
          Stake
        </ActionButton>
      </Center>
    </Flex>
  );
};

export default PoolItem;
