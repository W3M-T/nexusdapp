import { Flex } from "@chakra-ui/react";
import { useAppSelector } from "../../../../shared/hooks/core/useRedux";
import { selectUserStaked } from "../../../../shared/redux/slices/pools";
import { IStakedWithTokenDetails } from "../../../../shared/redux/types/pools.interface";
import NFTCard from "../NFTCard/NFTCard";

interface IProps {
  handleViwNft: (nft: IStakedWithTokenDetails) => void;
}

const NftsList = ({ handleViwNft }: IProps) => {
  const stakedNfts = useAppSelector(selectUserStaked);

  return (
    <Flex
      justifyContent={"center"}
      columnGap={5}
      rowGap="10"
      flexWrap="wrap"
      mt={10}
    >
      {stakedNfts.data.nfts.map((nft) => {
        return (
          <NFTCard
            nft={nft}
            key={nft.nonce}
            onClick={() => handleViwNft(nft)}
          />
        );
      })}
    </Flex>
  );
};

export default NftsList;
