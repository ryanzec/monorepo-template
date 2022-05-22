const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');

module.exports = {
  "stories": [
    "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins = [new TsconfigPathsPlugin()];

    config.plugins.push(new VanillaExtractPlugin());

    return config;
  }
}
