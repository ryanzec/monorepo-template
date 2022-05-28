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
      $components: path.join(__dirname, '..', 'packages', 'components'),
      $views: path.join(__dirname, '..', 'packages', 'views'),
      $utils: path.join(__dirname, '..', 'packages', 'utils'),
      $types: path.join(__dirname, '..', 'packages', 'types'),
      $hooks: path.join(__dirname, '..', 'packages', 'hooks'),
      $contexts: path.join(__dirname, '..', 'packages', 'contexts'),
      '$storybook-helpers': path.join(__dirname, '..', 'packages', 'storybook-helpers'),
    };

    // Return the altered config
    return config;
  },
}
