import { NetworkType } from "../shared/types/network";

// Default Elrond network configuration (constants).
// Change if you need, but by default, you shouldn't have to do that.

export const DEFAULT_MIN_GAS_LIMIT = 50_000;

export const DAPP_CONFIG_ENDPOINT = "/dapp/config";
export const DAPP_INIT_ROUTE = "/dapp/init";

export const chainType = process.env.NEXT_PUBLIC_ELROND_CHAIN || "devnet";

export const networkConfig: Record<string, NetworkType> = {
  devnet: {
    id: "devnet",
    shortId: "D",
    name: "Devnet",
    egldLabel: "xEGLD",
    egldDenomination: "18",
    decimals: "4",
    gasPerDataByte: "1500",
    walletConnectDeepLink:
      "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/",
    walletConnectBridgeAddresses: ["https://bridge.walletconnect.org"],
    walletAddress: "https://devnet-wallet.elrond.com",
    apiAddress:
      process.env.NEXT_PUBLIC_ELROND_API || "https://devnet-api.elrond.com",
    explorerAddress: "https://devnet-explorer.elrond.com",
    apiTimeout: "40000",
    gatewayAddress: "https://devnet-gateway.elrond.com",
    contractAddr: {
      nftsStaking:
        "erd1qqqqqqqqqqqqqpgqz4vuknaw4yw38zv4wqze4a5hrg3ft5tz8pgq36nxy4",
    },
    tokens: {
      EGLD: { identifier: "EGLD" },
      WATER: { identifier: "WATER-f4db53" },
    },
  },

  testnet: {
    id: "testnet",
    shortId: "T",
    name: "Testnet",
    egldLabel: "xEGLD",
    egldDenomination: "18",
    decimals: "4",
    gasPerDataByte: "1500",
    walletConnectDeepLink:
      "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/",
    walletConnectBridgeAddresses: ["https://bridge.walletconnect.org"],
    walletAddress: "https://testnet-wallet.elrond.com",
    apiAddress:
      process.env.NEXT_PUBLIC_ELROND_API || "https://testnet-api.elrond.com",
    explorerAddress: "https://testnet-explorer.elrond.com",
    apiTimeout: "40000",
    gatewayAddress: "https://testnet-gateway.elrond.com",
    contractAddr: {},
    tokens: {
      EGLD: { identifier: "EGLD" },
    },
  },

  mainnet: {
    id: "mainnet",
    shortId: "1",
    name: "Mainnet",
    egldLabel: "EGLD",
    egldDenomination: "18",
    decimals: "4",
    gasPerDataByte: "1500",
    walletConnectDeepLink:
      "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/",
    walletConnectBridgeAddresses: ["https://bridge.walletconnect.org"],
    walletAddress: "https://wallet.elrond.com",
    apiAddress: process.env.NEXT_PUBLIC_ELROND_API || "https://api.elrond.com",
    explorerAddress: "https://explorer.elrond.com",
    apiTimeout: "40000",
    gatewayAddress: "https://gateway.elrond.com",
    contractAddr: {
      nftsStaking:
        "erd1qqqqqqqqqqqqqpgq8tn6u8l2vytjhv6pcv0vu5tug52acutm8pgqnle42n",
    },
    tokens: {
      EGLD: { identifier: "EGLD" },
      WATER: { identifier: "WATER-9ed400" },
      MERMAID: { identifier: "MERMAID-9c388a" },
    },
  },
};

export const selectedNetwork = networkConfig[chainType];
