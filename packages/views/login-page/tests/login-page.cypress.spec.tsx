import React from 'react';
import { cypressUtils } from '$/utils/cypress';
import LoginPage from '$/views/login-page/login-page';
import { authenticationContext } from '$/contexts/authentication';
import { routerUtils } from '$/utils/router';

const selectors = {
  loginPage: '[data-id="login-page"]',
  loginButton: '[data-id="login-page"] [data-id="login-button"]',
};

describe('login page', () => {
  it('login', () => {
    const navigateStub = cy.stub();
    const useNavigateStub = cy.stub(routerUtils, 'useNavigate', () => navigateStub).as('useAuthenticationContextStub');
    const authenticationStub = {
      login: cy.stub(),
      finishLogin: cy.stub(),
      loginRedirectUrl: '',
    };
    const useAuthenticationContextStub = cy
      .stub(authenticationContext, 'useContext', () => authenticationStub)
      .as('useAuthenticationContextStub');

    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addApplicationFrameWrapper(<LoginPage />));

    cy.get(selectors.loginPage).should('exist');

    cy.get(selectors.loginButton).click();

    cy.get('@useAuthenticationContextStub').then(() => {
      // one of calls comes from the application frame
      expect(useAuthenticationContextStub.callCount).to.equal(2);
      expect(useAuthenticationContextStub.getCall(0).args).to.deep.equal([]);
      expect(useAuthenticationContextStub.getCall(1).args).to.deep.equal([]);
      expect(authenticationStub.login.callCount).to.equal(1);
      expect(authenticationStub.login.getCall(0).args).to.deep.equal([]);
      expect(authenticationStub.finishLogin.callCount).to.equal(0);
      expect(useNavigateStub.callCount).to.equal(1);
      expect(useNavigateStub.getCall(0).args).to.deep.equal([]);
      expect(navigateStub.callCount).to.equal(0);
    });
  });

  it('finish login', () => {
    const loginRedirectUrl = '/redirect';
    const navigateStub = cy.stub();
    const useNavigateStub = cy.stub(routerUtils, 'useNavigate', () => navigateStub).as('useAuthenticationContextStub');
    const authenticationStub = {
      login: cy.stub(),
      finishLogin: cy.stub(),
      loginRedirectUrl,
    };
    const useAuthenticationContextStub = cy
      .stub(authenticationContext, 'useContext', () => authenticationStub)
      .as('useAuthenticationContextStub');

    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addApplicationFrameWrapper(<LoginPage />));

    cy.get(selectors.loginPage).should('exist');

    cy.get('@useAuthenticationContextStub').then(() => {
      // one of calls comes from the application frame
      expect(useAuthenticationContextStub.callCount).to.equal(2);
      expect(useAuthenticationContextStub.getCall(0).args).to.deep.equal([]);
      expect(useAuthenticationContextStub.getCall(0).args).to.deep.equal([]);
      expect(authenticationStub.login.callCount).to.equal(0);
      expect(authenticationStub.finishLogin.callCount).to.equal(1);
      expect(authenticationStub.finishLogin.getCall(0).args).to.deep.equal([]);
      expect(useNavigateStub.callCount).to.equal(1);
      expect(useNavigateStub.getCall(0).args).to.deep.equal([]);
      expect(navigateStub.callCount).to.equal(1);
      expect(navigateStub.getCall(0).args).to.deep.equal([loginRedirectUrl]);
    });
  });
});
