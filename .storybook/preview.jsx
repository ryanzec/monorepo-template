import '@fontsource/inter';
import '../packages/styles/variables.css';
import '../packages/styles/keyframes.css';
import '../packages/styles/normalize.css';

import sort from 'storybook-multilevel-sort';
import React from 'react';

const order = {
  articles: null,
  elements: {
    '*': { default: null },
  },
  components: {
    header: {
      default: null,
      'with search': null,
    },
    '*': { default: null },
  },
};

export const decorators = [
  (Story) => {
    return <Story />;
  },
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: (story1, story2) => sort(order, story1, story2),
  },
};
