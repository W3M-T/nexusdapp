import { Center, Grid, Spinner } from "@chakra-ui/react";
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
    <Grid
      columnGap={5}
      rowGap="10"
      mt={10}
      templateColumns={{
        sm: "1fr",
        lsm: "1fr 1fr",
        lg: "1fr 1fr 1fr",
        xl: "1fr 1fr 1fr 1fr",
      }}
    >
      {stakedNfts.status === "loading" ? (
        <Center minH={"300px"}>
          <Spinner size={"lg"} />
        </Center>
      ) : (
        <>
          {stakedNfts.data.nfts.map((nft) => {
            return (
              <NFTCard
                nft={nft}
                key={nft.nonce}
                onClick={() => handleViwNft(nft)}
              />
            );
          })}
        </>
      )}
    </Grid>
  );
};

export default NftsList;
