import React from 'react';

import { ApplicationLoading } from '$/components/application-loading/application-loading';
import { cypressUtils } from '$/utils/cypress';

const selector = {
  applicationLoading: '[data-id="application-loading"]',
};

describe('application loading', () => {
  it('works properly', () => {
    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addApplicationFrameWrapper(<ApplicationLoading />));

    cy.get(selector.applicationLoading).should('exist');
  });
});
