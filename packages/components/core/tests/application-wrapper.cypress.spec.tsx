import * as React from 'react';

import { ApplicationWrapper } from '$/components/core/application-wrapper';
import { authenticationContext } from '$/contexts/authentication';
import { cypressUtils } from '$/utils/cypress';
import { routerUtils } from '$/utils/router';

const selectors = {
  applicationLoading: '[data-id="application-loading"]',
  navigation: '[data-id="frame"] [data-id="navigation"]',
};

describe('application wrapper', () => {
  it('works properly when loading', () => {
    cypressUtils.setupAuthenticationStub({
      isLoading: true,
      isAuthenticated: false,
    });

    cy.viewport(1024, 768);
    // the application wrapper includes the application frame so just the basic wrapper here
    cy.mount(cypressUtils.addBasicWrapper(<ApplicationWrapper />));

    cy.get(selectors.applicationLoading).should('exist');
  });

  it('works properly when not loading', () => {
    cypressUtils.setupAuthenticationStub({
      isAuthenticated: true,
    });
    cypressUtils.setupNavigateStub();

    cy.viewport(1024, 768);
    // the application wrapper includes the application frame so just the basic wrapper here
    cy.mount(cypressUtils.addBasicWrapper(<ApplicationWrapper />));

    cy.get(selectors.applicationLoading).should('not.exist');
    cy.get(selectors.navigation).should('exist');
  });
});
