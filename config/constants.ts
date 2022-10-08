// This configuration file keeps all UI constants and settings

// Your Dapp hostname example: https://www.mydapp.com it should come from env vars
export const dappHostname = process.env.NEXT_PUBLIC_DAPP_HOST;

// HTML metata and og tags, default values for MetaHead.tsx component
export const defaultMetaTags = {
  title: "Elrond NextJS dapp demo - Elrond blockchain",
  description: "Open source Dapp template for the Elrond blockchain.",
  image: `${dappHostname}/og-image.png`,
};

// Only allow admin to go to admin pages
export const ONLY_ADMIN = true;

// Only allow nft creator to go to nft creator pages
export const ONLY_NFT_CREATOR = true;
