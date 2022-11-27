import { INft } from "../redux/types/tokens.interface";

export const noShowMedia = (nft: INft) => {
  if (
    !nft.media ||
    nft.media[0]?.url ===
      "https://media.elrond.com/nfts/thumbnail/default.png" ||
    nft.media[0]?.url.includes("ipfs")
  ) {
    return true;
  }
  return false;
};
