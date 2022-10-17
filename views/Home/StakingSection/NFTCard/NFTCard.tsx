import { Flex, Text } from "@chakra-ui/react";
import NextImg from "../../../../shared/components/ui/NextImg";
import { IStakedWithTokenDetails } from "../../../../shared/redux/types/pools.interface";
import { formatBalance } from "../../../../shared/utils/formatBalance";
import { formatTokenI } from "../../../../shared/utils/formatTokenIdentifier";
interface IProps {
  nft: IStakedWithTokenDetails;
  onClick: () => void;
}
const NFTCard = ({ nft, onClick }: IProps) => {
  return (
    <Flex
      height="full"
      cursor="pointer"
      position={"relative"}
      flexDir="column"
      onClick={onClick}
      border="1px solid"
      borderColor={"dappTemplate.color2.base"}
      borderRadius="0.7rem"
      padding={"4"}
      bg="black"
    >
      <Text fontSize={"xl"} fontWeight="bold" mb={1}>
        {nft.name}
      </Text>{" "}
      <Flex mb={3} fontSize="small" flexDir={{ sm: "column", lsm: "row" }}>
        <Text color="gray.400" fontWeight="bold" mr={1}>
          Est. Rewards:
        </Text>{" "}
        <Text>
          {formatBalance({
            balance: nft.estimatedRewards,
            decimals: nft.tokenDetails?.decimals,
          })}{" "}
          {formatTokenI(nft.nftPool.token)}
        </Text>{" "}
      </Flex>
      <NextImg
        alt={"nft"}
        width={["160px", "160px", "160px", "253px"]}
        sx={{
          span: {
            borderRadius: "1rem",
          },
        }}
        src={nft.url}
        nextProps={{
          height: 490,
          width: 490,
        }}
      />
    </Flex>
  );
};

export default NFTCard;
