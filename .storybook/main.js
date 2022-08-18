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
    'storybook-css-modules',
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
  env: (config) => ({
    ...config,
    VITE_BASE_API_URL: 'http://localhost:6006/api',
  }),
  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins = [new TsconfigPathsPlugin({ configFile: `${__dirname}/../tsconfig.json` })];

    // not sure of a better way to enable proper css module support
    const rules = config.module.rules.map((rule) => {
      if (!rule.use) {
        return rule;
      }

      const cssLoader = rule.use.find((use) => use.loader && use.loader.match(/\/css-loader\//));

      if (!cssLoader) {
        return rule;
      }

      cssLoader.options = {
        ...(cssLoader.options || {}),
        localsConvention: 'camelCase',
      };

      return rule;
    });

    config.module.rules = rules;

    // // really hacky solution to get modules to work, wait for a fix to be merged:
    // // https://github.com/storybookjs/addon-postcss/pull/30
    // config.module.rules[7].use[1].options = {
    //   modules: true,
    //
    // };
    //
    // config.resolve.plugins = [new TsconfigPathsPlugin({ configFile: `${__dirname}/../tsconfig.json` })];

    return config;
  },
};
