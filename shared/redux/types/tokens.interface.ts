export interface INft {
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
}
