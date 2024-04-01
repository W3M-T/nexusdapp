export interface IToken {
  identifier: string;
  decimals?: number;
}
export interface IElrondToken extends IToken {
  name: string;
  ticker: string;
  owner: string;
  decimals: number;
  isPaused: false;
  assets: {
    [x: string]: any;
    description: string;
    status: string;
    social: {
      telegram: string;
      twitter: string;
    };
    pngUrl: string;
    svgUrl: string;
  };
  transactions: number;
  accounts: number;
  canUpgrade: boolean;
  canMint: boolean;
  canBurn: boolean;
  canChangeOwner: boolean;
  canPause: boolean;
  canFreeze: boolean;
  canWipe: boolean;
  type: string,
  price: number,
  marketCap: number,
  supply: number,
  circulatingSupply: number,
  earnedAmount?: string | number;
}

interface ITokens {
  EGLD: IToken;
  WATER?: IToken;
  MERMAID?: IToken;
  WEGLD?: IToken;
}
interface ISmartContracts {
  nftsStaking?: string;
}

export interface BaseNetworkType {
  id: string;
  shortId: string;
  name: string;
  egldLabel: string;
  egldDenomination: string;
  decimals: string;
  gasPerDataByte: string;
  walletConnectDeepLink: string;
  walletAddress: string;
  apiAddress: string;
  explorerAddress: string;
  apiTimeout: string;
  gatewayAddress: string;
}

export interface NetworkType extends BaseNetworkType {
  walletConnectBridgeAddresses: string[];
  contractAddr: ISmartContracts;
  tokens: ITokens;
}

export interface IElrondUserAccount {
  address: string;
  balance: string;
  nonce: number;
  shard: number;
  assets?: any;
  code?: string;
  codeHash?: string;
  rootHash?: string;
  txCount: number;
  scrCount: number;
  username?: string;
  developerReward?: string;
  ownerAddress?: string;
  deployedAt?: number;
  isUpgradeable?: boolean;
  isReadable?: boolean;
  isPayable?: boolean;
  isPayableBySmartContract?: boolean;
  scamInfo?: {
    type: number;
    info: string;
  };
}
