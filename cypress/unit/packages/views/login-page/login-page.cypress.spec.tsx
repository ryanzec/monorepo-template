import React from 'react';
import { mount } from '@cypress/react';
import * as cypressUtils from '$utils/cypress';
import { LoginPage } from '$views/login-page/login-page';
import authenticationContext from '$contexts/authentication';

const selectors = {
  loginPage: '[data-id="login-page"]',
  loginButton: '[data-id="login-page"] [data-id="login-button"]',
};

describe('login page', () => {
  it('login works properly', () => {
    const authenticationStub = {
      login: cy.stub(),
      isAuthenticated: false,
    };
    const useAuthenticationContextStub = cy
      .stub(authenticationContext, 'useContext', () => authenticationStub)
      .as('useAuthenticationContextStub');

    cy.viewport(1024, 768);
    mount(cypressUtils.addApplicationFrameWrapper(<LoginPage />));

    cy.get(selectors.loginPage).should('exist');

    cy.get(selectors.loginButton).click();

    cy.get('@useAuthenticationContextStub').then(() => {
      expect(useAuthenticationContextStub.callCount).to.equal(2);
      expect(useAuthenticationContextStub.getCall(0).args).to.deep.equal([]);
      expect(useAuthenticationContextStub.getCall(1).args).to.deep.equal([]);
      expect(authenticationStub.login.callCount).to.equal(1);
      expect(authenticationStub.login.getCall(0).args).to.deep.equal([]);
    });
  });
});
