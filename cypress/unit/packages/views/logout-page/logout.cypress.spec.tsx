import React from 'react';
import { mount } from '@cypress/react';
import * as cypressUtils from '$utils/cypress';
import { LogoutPage } from '$views/logout-page/logout-page';
import authenticationContext from '$contexts/authentication';

const selectors = {
  logoutPage: '[data-id="logout-page"]',
};

describe('logout page', () => {
  it('works properly', () => {
    const authenticationStub = {
      login: cy.stub(),
      isAuthenticated: false,
    };
    const useAuthenticationContextStub = cy
      .stub(authenticationContext, 'useContext', () => authenticationStub)
      .as('useAuthenticationContextStub');

    cy.viewport(1024, 768);
    mount(cypressUtils.addApplicationFrameWrapper(<LogoutPage />));

    cy.get(selectors.logoutPage).should('exist');

    cy.get('@useAuthenticationContextStub').then(() => {
      expect(useAuthenticationContextStub.callCount).to.equal(1);
      expect(useAuthenticationContextStub.getCall(0).args).to.deep.equal([]);
    });
  });
});
