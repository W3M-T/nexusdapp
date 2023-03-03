// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require("next-transpile-modules")(["@multiversx/sdk-dapp"]);
const nextConfig = {
  images: {
    domains: [
      "media.elrond.com",
      "gateway.pinata.cloud",
      "devnet-media.elrond.com",
      "arweave.net",
    ],
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_ELROND_API}/:path*`,
        destination: `${process.env.ELROND_CUSTOM_API}/:path*`,
      },
    ];
  },
  eslint: {
    dirs: ["components", "config", "hooks", "pages", "store", "types", "utils"],
  },
};

module.exports = (phase, defaultConfig) => {
  const plugins = [withTM, (config) => config];

  const config = plugins.reduce(
    (acc, plugin) => {
      const update = plugin(acc);
      return typeof update === "function"
        ? update(phase, defaultConfig)
        : update;
    },
    { ...nextConfig }
  );

  return config;
};
