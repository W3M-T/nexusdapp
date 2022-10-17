// This configuration file keeps all UI constants and settings

// Your Dapp hostname example: https://www.mydapp.com it should come from env vars
export const dappHostname = process.env.NEXT_PUBLIC_DAPP_HOST;

// HTML metata and og tags, default values for MetaHead.tsx component
export const defaultMetaTags = {
  title: "The NFTs Nexus porject",
  description:
    "The Nexus staking service. NFT creators will be alble to create pools for their collection so their community can stake their NFTs.",
  image: `${dappHostname}/logo.png`,
};
