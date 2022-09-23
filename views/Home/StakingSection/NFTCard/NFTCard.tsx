import { Center, Text } from "@chakra-ui/react";
import NextImg from "../../../../components/ui/NextImg";
const NFTCard = () => {
  return (
    <Center
      height="full"
      // onClick={() => handleViwNft(nft)}
      cursor="pointer"
      position={"relative"}
      flexDir="column"
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
        src={
          "https://ipfs.io/ipfs/QmYfRXS4jqijwnvMiZELa53fgw5CnSwrkkkvwQ8oumofdy"
        } // use normal <img> attributes as props
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
        Elrond Mafia
      </Text>
    </Center>
  );
};

export default NFTCard;
