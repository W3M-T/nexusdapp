import { ExtensionProvider } from "@elrondnetwork/erdjs-extension-provider";
import { HWProvider } from "@elrondnetwork/erdjs-hw-provider";
import {
  ApiNetworkProvider,
  ProxyNetworkProvider,
} from "@elrondnetwork/erdjs-network-providers";
import { WalletConnectProvider } from "@elrondnetwork/erdjs-wallet-connect-provider";
import { WalletProvider } from "@elrondnetwork/erdjs-web-wallet-provider";

interface ISmartContracts {
  mundialBet?: string;
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
  contractAddr: ISmartContracts;
}

export interface NetworkType extends BaseNetworkType {
  walletConnectBridgeAddresses: string[];
}

export type DappProvider =
  | ExtensionProvider
  | WalletConnectProvider
  | WalletProvider
  | HWProvider;

export type NetworkProvider = ApiNetworkProvider | ProxyNetworkProvider;
