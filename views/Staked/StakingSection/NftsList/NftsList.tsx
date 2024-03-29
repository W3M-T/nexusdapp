import { Center, Grid, Spinner } from "@chakra-ui/react";
import { addDays } from "date-fns";
import orderBy from "lodash/orderBy";
import { useAppSelector } from "../../../../shared/hooks/core/useRedux";
import { selectUserStaked } from "../../../../shared/redux/slices/pools";
import { IStakedWithTokenDetails } from "../../../../shared/redux/types/pools.interface";
import { createIndentifierByCollectionAndNonce } from "../../../../shared/utils/formatTokenIdentifier";
import NFTCard from "../NFTCard/NFTCard";

interface IProps {
  handleViwNft: (nft: IStakedWithTokenDetails, reward: number) => void;
  selectedNfts: IStakedWithTokenDetails[];
}

const NftsList = ({ handleViwNft, selectedNfts }: IProps) => {
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
          {orderBy(
            stakedNfts.data.nfts,
            [
              function (pool) {
                return addDays(
                  new Date(pool.nftPool.timestam * 1000),
                  pool.nftPool.poolDuration
                ).getTime();
              },
            ],
            "asc"
          ).map((nft) => {
            return (
              <NFTCard
                nft={nft}
                key={nft.nonce}
                onClick={(reward) => handleViwNft(nft, reward)}
                selected={Boolean(
                  selectedNfts.find(
                    (stakedNft) =>
                      createIndentifierByCollectionAndNonce(
                        stakedNft.token,
                        stakedNft.nonce
                      ) ===
                      createIndentifierByCollectionAndNonce(
                        nft.token,
                        nft.nonce
                      )
                  )
                )}
              />
            );
          })}
        </>
      )}
    </Grid>
  );
};

export default NftsList;
