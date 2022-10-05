import { INft } from "../../redux/types/tokens.interface";

export const noShowMedia = (nft: INft) => {
  if (
    !nft.media ||
    nft.media[0]?.url === "https://media.elrond.com/nfts/thumbnail/default.png"
  ) {
    return true;
  }
  return false;
};
