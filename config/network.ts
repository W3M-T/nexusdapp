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
      nftsStaking: "",
      faucetNexus: "erd1qqqqqqqqqqqqqpgq22l29szm8xgupwvh44fpxhlwjtuhwvw98pgqcwmh48",
      faucetMermaid: "erd1qqqqqqqqqqqqqpgqjxsyl920u5mgn4fpvz0erw78wdpu7vyw8pgqs5ektw",
      nexusSwap: "erd1qqqqqqqqqqqqqpgqf6zqulgv4328k9ws8yxwqcrxezwm5n9fu7zsu40u8k",
      nftMarketplace: "erd1qqqqqqqqqqqqqpgqpxf0unjcqnqajn589dwfwdtk6ykz5x2t8pgq73qspr"
    },
    tokens: {
      EGLD: { identifier: "EGLD" },
      WEGLD: { identifier: "WEGLD-a28c59", decimals: 18, faucet: "faucetMermaid"},
      USDC: { identifier: "USDC-350c4e", decimals: 6 },
      NEXUS: { identifier: "NXS-7f88a4", decimals: 18, faucet: "faucetNexus", initialSupply: 100000000000000000000000000},
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
      nftsStaking: "erd1qqqqqqqqqqqqqpgq8tn6u8l2vytjhv6pcv0vu5tug52acutm8pgqnle42n",
      faucetNexus: "erd1qqqqqqqqqqqqqpgqjz2ux62ynvyphz6a8cqpmu5k9fw242ef8pgq3x5mvx",
      faucetMermaid: "erd1qqqqqqqqqqqqqpgqkdkjcexnkx3ety05494ylgrhtg9p6d648pgq7pucfa",
      nexusSwap: "erd1qqqqqqqqqqqqqpgqdn6x8qeh73x258pyrusftsu0x0a5jzqpu7zspzpyf2",
      nftMarketplace: ""
    },
    tokens: {
      EGLD: { identifier: "EGLD", decimals: 18 },
      WATER: { identifier: "WATER-9ed400", decimals: 18},
      MERMAID: { identifier: "MERMAID-9c388a", decimals: 18, faucet: "faucetMermaid"},
      NEXUS: { identifier: "NEXUS-71d1d6", decimals: 18, faucet: "faucetNexus", initialSupply: 100000000000000000000000000},
      WEGLD: { identifier: "WEGLD-bd4d79", decimals: 18},
      USDC: { identifier: "USDC-c76f1f", decimals: 6},
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
