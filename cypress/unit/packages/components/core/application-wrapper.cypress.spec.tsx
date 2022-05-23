import * as React from 'react';
import { mount } from '@cypress/react';
import * as cypressUtils from '$utils/cypress';
import { ApplicationWrapper } from '$components/core/application-wrapper';
import authenticationContext from '$contexts/authentication';
import * as routerUtils from '$utils/router';

const selectors = {
  applicationLoading: '[data-id="application-loading"]',
  navigation: '[data-id="frame"] [data-id="navigation"]',
};

describe('application wrapper', () => {
  it('works properly when loading', () => {
    const authenticationStub = {
      isLoading: true,
    };
    cy.stub(authenticationContext, 'useContext', () => authenticationStub);

    cy.viewport(1024, 768);
    // the application wrapper includes the application frame so just the basic wrapper here
    mount(cypressUtils.addBasicWrapper(<ApplicationWrapper />));

    cy.get(selectors.applicationLoading).should('exist');
  });

  it('works properly when not loading', () => {
    const authenticationStub = {
      isLoading: false,
      isAuthenticated: true,
    };

    cy.stub(authenticationContext, 'useContext', () => authenticationStub);

    const navigateStub = cy.stub().as('navigateStub');

    cy.stub(routerUtils, 'useNavigate', () => navigateStub).as('useNavigateStub');

    cy.viewport(1024, 768);
    // the application wrapper includes the application frame so just the basic wrapper here
    mount(cypressUtils.addBasicWrapper(<ApplicationWrapper />));

    cy.get(selectors.applicationLoading).should('not.exist');
    cy.get(selectors.navigation).should('exist');
  });
});
