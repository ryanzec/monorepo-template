const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

function wrapLoader(loader, options) {
  if (options === false) {
    return [];
  }
  return [{ loader, options }];
}

module.exports = {
  stories: ['../packages/**/*.stories.mdx', '../packages/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: { implementation: require('postcss') },
      },
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
    disableTelemetry: true,
  },
  features: {
    babelModeV7: true,
  },
  webpackFinal: async (config, { configType }) => {
    // really hacky solution to get modules to work, wait for a fix to be merged:
    // https://github.com/storybookjs/addon-postcss/pull/30
    config.module.rules[7].use[1].options = {
      modules: true,
    };
    console.log(JSON.stringify(config.module.rules[7].use, null, 2));

    config.resolve.plugins = [new TsconfigPathsPlugin()];

    return config;
  },
};
