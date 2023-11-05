// Default Elrond network configuration (constants).
// Change if you need, but by default, you shouldn't have to do that.

export const DEFAULT_MIN_GAS_LIMIT = 50_000;

export const DAPP_CONFIG_ENDPOINT = "/dapp/config";
export const DAPP_INIT_ROUTE = "/dapp/init";

export const chainType = process.env.NEXT_PUBLIC_CHAIN || "devnet";

export const networkConfig = {
  devnet: {
    id: "devnet",
    shortId: "D",
    name: "Devnet",
    egldLabel: "xEGLD",
    egldDenomination: "18",
    decimals: "4",
    gasPerDataByte: "1500",
    walletConnectDeepLink:
      "https://maiar.page.link/?apn=com.multiversx.maiar.wallet&isi=1519405832&ibi=com.multiversx.maiar.wallet&link=https://maiar.com/",
    walletConnectBridgeAddresses: ["https://bridge.walletconnect.org"],
    walletAddress: "https://devnet-wallet.multiversx.com",
    apiAddress: "https://devnet-api.multiversx.com",
    explorerAddress: "https://devnet-explorer.multiversx.com",
    apiTimeout: "40000",
    gatewayAddress: "https://devnet-gateway.multiversx.com",
    contractAddr: {
      nftsStaking:
        "erd1qqqqqqqqqqqqqpgqz4vuknaw4yw38zv4wqze4a5hrg3ft5tz8pgq36nxy4",
    },
    tokens: {
      EGLD: { identifier: "EGLD" },
      WATER: { identifier: "WATER-f4db53" },
      WEGLD: { identifier: "WEGLD-bd4d79" },
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
      "https://maiar.page.link/?apn=com.multiversx.maiar.wallet&isi=1519405832&ibi=com.multiversx.maiar.wallet&link=https://maiar.com/",
    walletConnectBridgeAddresses: ["https://bridge.walletconnect.org"],
    walletAddress: "https://testnet-wallet.multiversx.com",
    apiAddress: "https://testnet-api.multiversx.com",
    explorerAddress: "https://testnet-explorer.multiversx.com",
    apiTimeout: "40000",
    gatewayAddress: "https://testnet-gateway.multiversx.com",
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
      "https://maiar.page.link/?apn=com.multiversx.maiar.wallet&isi=1519405832&ibi=com.multiversx.maiar.wallet&link=https://maiar.com/",
    walletConnectBridgeAddresses: ["https://bridge.walletconnect.org"],
    walletAddress: "https://wallet.multiversx.com",
    apiAddress: "https://api.multiversx.com",
    explorerAddress: "https://explorer.multiversx.com",
    apiTimeout: "40000",
    gatewayAddress: "https://gateway.multiversx.com",
    contractAddr: {
      nftsStaking:
        "erd1qqqqqqqqqqqqqpgq8tn6u8l2vytjhv6pcv0vu5tug52acutm8pgqnle42n",
    },
    tokens: {
      EGLD: { identifier: "EGLD" },
      WATER: { identifier: "WATER-9ed400" },
      MERMAID: { identifier: "MERMAID-9c388a", decimals: 18 },
    },
  },
};

export const selectedNetwork = networkConfig[chainType];

//general configs
export const walletConnectV2ProjectId = "d57456f79cf0f38f6e941f057a90307c";
export const apiTimeout = 6000;
export const TOOLS_API_URL = "https://tools.multiversx.com";
export const sampleAuthenticatedDomains = [TOOLS_API_URL];

export const egldFee = Number(process.env.NEXT_PUBLIC_EGLD_FEE || "0.0025");
