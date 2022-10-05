import { Center, Text } from "@chakra-ui/react";
import { IStaked } from "../../../../redux/types/pools.interface";
import NextImg from "../../../../shared/components/ui/NextImg";
interface IProps {
  nft: IStaked;
  onClick: () => void;
}
const NFTCard = ({ nft, onClick }: IProps) => {
  return (
    <Center
      height="full"
      // onClick={() => handleViwNft(nft)}
      cursor="pointer"
      position={"relative"}
      flexDir="column"
      onClick={onClick}
    >
      {" "}
      <NextImg
        alt={"nft"}
        width={["80px", "100px", "150px", "263px"]}
        sx={{
          span: {
            borderRadius: "0.7rem",
          },
        }}
        src={nft.url} // use normal <img> attributes as props
        nextProps={{
          height: 490,
          width: 490,
        }}
      />
      <Text
        textAlign={"center"}
        fontSize={"small"}
        fontWeight="bold"
        marginTop={"20px"}
      >
        {nft.name}
      </Text>
    </Center>
  );
};

export default NFTCard;
