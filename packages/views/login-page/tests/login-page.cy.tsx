import React from 'react';

import { authenticationContext } from '$/contexts/authentication';
import { cypressUtils } from '$/utils/cypress';
import { routerUtils } from '$/utils/router';
import LoginPage from '$/views/login-page/login-page';

const selectors = {
  loginPage: '[data-id="login-page"]',
  loginButton: '[data-id="login-page"] [data-id="login-button"]',
};

describe('login page', () => {
  it('login', () => {
    const { useNavigateStub, navigateStub } = cypressUtils.setupNavigateStub();
    const { useAuthenticationContextStub, authenticationContextStub } = cypressUtils.setupAuthenticationStub({
      isAuthenticated: false,
    });

    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addApplicationFrameWrapper(<LoginPage />));

    cy.get(selectors.loginPage).should('exist');

    cy.get(selectors.loginButton).click();

    cy.get('@useAuthenticationContextStub').then(() => {
      // one of calls comes from the application frame
      expect(useAuthenticationContextStub.callCount).to.equal(2);
      expect(useAuthenticationContextStub.getCall(0).args).to.deep.equal([]);
      expect(useAuthenticationContextStub.getCall(1).args).to.deep.equal([]);
      expect(authenticationContextStub.login.callCount).to.equal(1);
      expect(authenticationContextStub.login.getCall(0).args).to.deep.equal([]);
      expect(authenticationContextStub.finishLogin.callCount).to.equal(0);
      expect(useNavigateStub.callCount).to.equal(1);
      expect(useNavigateStub.getCall(0).args).to.deep.equal([]);
      expect(navigateStub.callCount).to.equal(0);
    });
  });

  it('finish login', () => {
    const loginRedirectUrl = '/redirect';
    const { useNavigateStub, navigateStub } = cypressUtils.setupNavigateStub();
    const { useAuthenticationContextStub, authenticationContextStub } = cypressUtils.setupAuthenticationStub({
      isAuthenticated: false,
      loginRedirectUrl,
    });

    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addApplicationFrameWrapper(<LoginPage />));

    cy.get(selectors.loginPage).should('exist');

    cy.get('@useAuthenticationContextStub').then(() => {
      // one of calls comes from the application frame
      expect(useAuthenticationContextStub.callCount).to.equal(2);
      expect(useAuthenticationContextStub.getCall(0).args).to.deep.equal([]);
      expect(useAuthenticationContextStub.getCall(0).args).to.deep.equal([]);
      expect(authenticationContextStub.login.callCount).to.equal(0);
      expect(authenticationContextStub.finishLogin.callCount).to.equal(1);
      expect(authenticationContextStub.finishLogin.getCall(0).args).to.deep.equal([]);
      expect(useNavigateStub.callCount).to.equal(1);
      expect(useNavigateStub.getCall(0).args).to.deep.equal([]);
      expect(navigateStub.callCount).to.equal(1);
      expect(navigateStub.getCall(0).args).to.deep.equal([loginRedirectUrl]);
    });
  });
});
