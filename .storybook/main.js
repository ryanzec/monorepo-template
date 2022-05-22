const webpackUtils = require('../webpackUtils');
const path = require("path");

module.exports = {
  "stories": [
    "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    // config.module.rules.push({
    //   test: /\.scss$/,
    //   use: ['style-loader', 'css-loader', 'sass-loader'],
    //   include: path.resolve(__dirname, '../'),
    // });

    config.resolve.alias = {
      $components: webpackUtils.RESOLVE_ALIAS.$components,
      $views: webpackUtils.RESOLVE_ALIAS.$views,
      $utils: webpackUtils.RESOLVE_ALIAS.$utils,
      $types: webpackUtils.RESOLVE_ALIAS.$types,
      $hooks: webpackUtils.RESOLVE_ALIAS.$hooks,
      $contexts: webpackUtils.RESOLVE_ALIAS.$contexts,
      '$storybook-helpers': webpackUtils.RESOLVE_ALIAS["$storybook-helpers"],
    };

    // Return the altered config
    return config;
  },
}
