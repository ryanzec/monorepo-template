// disabling certain checks in order to make sure this can work f=with storybooks configuration setup
/* eslint-disable */
// noinspection WebpackConfigHighlighting

const path = require('path');

module.exports = {
  RESOLVE_ALIAS: {
    $components: path.join(__dirname, 'packages', 'components'),
    $views: path.join(__dirname, 'packages', 'views'),
    $utils: path.join(__dirname, 'packages', 'utils'),
    $types: path.join(__dirname, 'packages', 'types'),
    $hooks: path.join(__dirname, 'packages', 'hooks'),
    $contexts: path.join(__dirname, 'packages', 'contexts'),
    '$storybook-helpers': path.join(__dirname, 'packages', 'storybook-helpers'),
  },
};
