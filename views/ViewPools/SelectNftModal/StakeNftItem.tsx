import { Center, Text } from "@chakra-ui/react";
import NextImg from "../../../shared/components/ui/NextImg";
import { INft } from "../../../shared/redux/types/tokens.interface";
import { noShowMedia } from "../../../shared/utils/excludeNft";

interface IProps {
  nft: INft;
  onClick: () => void;
  selected: boolean;
}
const StakeNftItem = ({ nft, onClick, selected }: IProps) => {
  if (noShowMedia(nft)) {
    return null;
  }
  return (
    <Center
      height="full"
      cursor="pointer"
      position={"relative"}
      flexDir="column"
      onClick={onClick}
      boxShadow={selected && "0px 0px 5px white"}
      pb={2}
    >
      {" "}
      <NextImg
        alt={"nft"}
        width={["80px", "100px"]}
        sx={{
          span: {
            borderRadius: "0.7rem",
          },
        }}
        src={nft.media[0].url} // use normal <img> attributes as props
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

export default StakeNftItem;
