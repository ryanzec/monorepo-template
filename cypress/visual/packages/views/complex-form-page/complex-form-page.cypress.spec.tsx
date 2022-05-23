import React from 'react';
import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react';

import * as stories from '$views/complex-form-page/complex-form-page.stories';

const { CypressDefault } = composeStories(stories);

describe('complex form page', () => {
  // this seems to testing react-dnd properly however it did take quite a few different sets of method that actually
  // worked so not sure this will work in all use cases but fingers crossed
  it('visual', () => {
    cy.viewport(1024, 768);
    mount(<CypressDefault />);

    cy.compareSnapshot('complex-form-page', 0.05);
  });
});
