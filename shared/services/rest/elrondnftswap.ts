import axios from "axios";
export interface IElrondnftswapNFT {
  _id: string;
  nativeAttributes: {
    trait_type: string;
    value: string;
    _id: string;
  }[];
  attributes: {
    trait_type: string;
    value: string;
    _id: string;
  }[];
  media: {
    thumbnailUrl: string;
    originalUrl: string;
    fileType: "image/png";
    url: string;
    _id: string;
  }[];
  royalties: string;
  creator: string;
  url: string;
  name: string;
  nonce: number;
  nftCollection: string;
  identifier: string;
  __v: number;
  rarityScore: number;
  rank: number;
}

const BASE_URL = "https://api.elrondnftswap.com";
const axiosElrondnftswap = axios.create({
  baseURL: BASE_URL,
});

export const getNftData = (nftIdentifier: string) => {
  return axiosElrondnftswap
    .get<IElrondnftswapNFT>(`/main/nft/${nftIdentifier}`)
    .then((res) => res.data);
};
