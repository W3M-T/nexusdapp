import { IElrondToken } from "../../types/network";

export interface IListingsInfo {
  listingId: number;
  nft_token: string;
  nft_nonce: number;
  nft_amount: number;
  creator: string;
  price: number;
  timestamp: number;
}

export interface IListedNft {
  identifier: string;
  collection: string;
  attributes: string;
  nonce: number;
  type: string;
  name: string;
  rank: string;
  creator: string;
  isWhitelistedStorage: false;
  balance: string;
  decimals: number;
  ticker: string;
  assets?: {
    website: string;
    description: string;
    status: string;
    pngUrl: string;
    svgUrl: string;
  };

  royalties?: number;
  uris?: string[];
  url?: string;
  media?: [
    {
      url: string;
      originalUrl: string;
      thumbnailUrl: string;
      fileType: string;
      fileSize: number;
    }
  ];
  
  tags?: string[];
  metadata?: {
    description: string;
    attributes: string[];
  };

  listingId?: number;
  listingPrice?: number;
  listingCreator?: string;
  listingTimestamp?: number;
}
