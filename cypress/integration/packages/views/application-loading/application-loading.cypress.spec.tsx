import React from 'react';
import { mount } from '@cypress/react';
import * as cypressUtils from '$utils/cypress';
import { ApplicationLoading } from '$views/application-loading/application-loading';

const selector = {
  applicationLoading: '[data-id="application-loading"]',
};

describe('application loading', () => {
  it('works properly', () => {
    cy.viewport(1024, 768);
    mount(cypressUtils.addApplicationFrameWrapper(<ApplicationLoading />));

    cy.get(selector.applicationLoading).should('exist');
  });
});
