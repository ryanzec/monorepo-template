const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
  features: {
    babelModeV7: true,
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    // Check docs here: https://storybook.js.org/docs/react/configure/webpack#extending-storybooks-webpack-config

    config.plugins.push(new MiniCssExtractPlugin({ filename: 'styles.css' }));

    // Add Linaria loader after babel-loader
    config.module.rules.splice(1, 0, {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('@linaria/webpack-loader'),
          options: {
            sourceMap: true,
            babelOptions: {
              presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@babel/preset-typescript'),
                require.resolve('@linaria/babel-preset'),
              ],
            },
          },
        },
      ],
    });

    // Replace CSS loader
    const cssKey = config.module.rules.findIndex(x => x.test.toString() === "/\\.css$/");

    config.module.rules[cssKey] =       {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        },
      ],
    };

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
