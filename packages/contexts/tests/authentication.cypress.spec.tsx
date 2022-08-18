import React from 'react';
import { localStorageCacheUtils } from '$/utils/local-storage-cache';
import { authenticationContext, LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY } from '$/contexts/authentication';
import { apiUtils } from '$/utils/api';

const authenticationContextMock = authenticationContext.createContext();

const MockConsumerComponent = () => {
  const { isLoading, isAuthenticated, login, logout, loginRedirectUrl, finishLogin } =
    authenticationContextMock.useContext();
  return (
    <div>
      <button data-id="login-button" onClick={() => login()}>
        login
      </button>
      <button data-id="finish-login-button" onClick={() => login()}>
        finish login
      </button>
      <button data-id="logout-button" onClick={() => logout()}>
        logout
      </button>
      testing
      <div data-id="is-loading-check">is loading: {JSON.stringify(isLoading)}</div>
      <div data-id="is-authenticated-check">is authenticated: {JSON.stringify(isAuthenticated)}</div>
      <div data-id="redirect-check">redirect: {JSON.stringify(loginRedirectUrl)}</div>
    </div>
  );
};

const MockComponent = () => {
  return (
    <authenticationContextMock.Provider>
      <MockConsumerComponent />
    </authenticationContextMock.Provider>
  );
};

const selectors = {
  loginButton: '[data-id="login-button"]',
  finishLoginButton: '[data-id="finish-login-button"]',
  logoutButton: '[data-id="logout-button"]',
  isLoadingCheck: '[data-id="is-loading-check"]',
  isAuthenticatedCheck: '[data-id="is-authenticated-check"]',
  redirectCheck: '[data-id="redirect-check"]',
};

describe('authentication context', () => {
  it('when logged in check is valid', () => {
    const authenticationToken = 'checkToken';

    localStorageCacheUtils.set(LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY, authenticationToken);

    const getAuthenticationStub = cy.stub(apiUtils.appApi, 'get').as('getAuthenticationStub');

    getAuthenticationStub.resolves();

    cy.mount(<MockComponent />);

    cy.get(selectors.isLoadingCheck).contains('false');
    cy.get(selectors.isAuthenticatedCheck).contains('true');

    cy.get('@getAuthenticationStub').then(() => {
      expect(getAuthenticationStub.callCount).to.equal(1);
      expect(getAuthenticationStub.getCall(0).args).to.deep.equal([`/authenticate/${authenticationToken}`]);
    });
  });

  it('when logged in check fails', () => {
    const authenticationToken = 'checkToken';

    localStorageCacheUtils.set(LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY, authenticationToken);

    const getAuthenticationStub = cy.stub(apiUtils.appApi, 'get').as('getAuthenticationStub');

    getAuthenticationStub.rejects();

    cy.mount(<MockComponent />);

    cy.get(selectors.isLoadingCheck).contains('false');
    cy.get(selectors.isAuthenticatedCheck).contains('false');

    cy.get('@getAuthenticationStub').then(() => {
      expect(getAuthenticationStub.callCount).to.equal(1);
      expect(getAuthenticationStub.getCall(0).args).to.deep.equal([`/authenticate/${authenticationToken}`]);
    });
  });

  it('when not logged in already', () => {
    localStorageCacheUtils.remove(LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY);

    const getAuthenticationStub = cy.stub(apiUtils.appApi, 'get').as('getAuthenticationStub');

    cy.mount(<MockComponent />);

    cy.get(selectors.isLoadingCheck).contains('false');
    cy.get(selectors.isAuthenticatedCheck).contains('false');

    cy.get('@getAuthenticationStub').then(() => {
      expect(getAuthenticationStub.callCount).to.equal(0);
    });
  });

  it('login', () => {
    const authenticationToken = 'new-token';

    localStorageCacheUtils.remove(LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY);

    const postAuthenticationStub = cy.stub(apiUtils.appApi, 'post').as('postAuthenticationStub');

    postAuthenticationStub.resolves({
      data: {
        authenticationToken,
      },
    });

    cy.mount(<MockComponent />);

    cy.get(selectors.loginButton).click();

    cy.get(selectors.isLoadingCheck).contains('false');
    cy.get(selectors.isAuthenticatedCheck).contains('true');
    cy.get(selectors.redirectCheck).contains('/home');

    cy.get('@postAuthenticationStub').then(() => {
      expect(postAuthenticationStub.callCount).to.equal(1);
      expect(postAuthenticationStub.getCall(0).args).to.deep.equal(['/authenticate']);
      expect(localStorageCacheUtils.get(LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY)).to.equal(authenticationToken);
    });
  });

  it('logout', () => {
    const authenticationToken = 'existing-token';

    localStorageCacheUtils.set(LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY, authenticationToken);

    cy.mount(<MockComponent />);

    cy.get(selectors.logoutButton).click();

    cy.get(selectors.isLoadingCheck).contains('false');
    cy.get(selectors.isAuthenticatedCheck).contains('false');
    cy.get(selectors.redirectCheck)
      .contains('/login')
      .then(() => {
        expect(localStorageCacheUtils.get(LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY)).to.equal(null);
      });
  });

  it('finish login', () => {
    const authenticationToken = 'new-token';

    localStorageCacheUtils.remove(LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY);

    const postAuthenticationStub = cy.stub(apiUtils.appApi, 'post').as('postAuthenticationStub');

    postAuthenticationStub.resolves({
      data: {
        authenticationToken,
      },
    });

    cy.mount(<MockComponent />);

    cy.get(selectors.loginButton).click();

    cy.get(selectors.redirectCheck).contains('/home');

    cy.get(selectors.finishLoginButton).click();
  });
});
