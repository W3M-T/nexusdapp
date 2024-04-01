// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require("next-transpile-modules")(["@multiversx/sdk-dapp"]);
const nextConfig = {
  transpilePackages: [
    "@ant-design",
    "@rc-component",
    "antd",
    "rc-cascader",
    "rc-checkbox",
    "rc-collapse",
    "rc-dialog",
    "rc-drawer",
    "rc-dropdown",
    "rc-field-form",
    "rc-image",
    "rc-input",
    "rc-input-number",
    "rc-mentions",
    "rc-menu",
    "rc-motion",
    "rc-notification",
    "rc-pagination",
    "rc-picker",
    "rc-progress",
    "rc-rate",
    "rc-resize-observer",
    "rc-segmented",
    "rc-select",
    "rc-slider",
    "rc-steps",
    "rc-switch",
    "rc-table",
    "rc-tabs",
    "rc-textarea",
    "rc-tooltip",
    "rc-tree",
    "rc-tree-select",
    "rc-upload",
    "rc-util",
  ],
  images: {
    domains: [
      "media.elrond.com",
      "gateway.pinata.cloud",
      "devnet-media.elrond.com",
      "arweave.net",
      "media.multiversx.com",
      "devnet-media.multiversx.com",
    ],
  },
  reactStrictMode: false,
  // async rewrites() {
  //   return [
  //     {
  //       source: `${process.env.NEXT_PUBLIC_ELROND_API}/:path*`,
  //       destination: `${process.env.ELROND_CUSTOM_API}/:path*`,
  //     },
  //   ];
  // },
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
    { ...nextConfig },
  );

  return config;
};
