import React from 'react';
import { Auth0Client } from '@auth0/auth0-spa-js';
import * as authenticationUtils from '$utils/authentication';
import { createAuthenticationContext } from '$contexts/authentication';
import { mount } from '@cypress/react';

const authenticationContextNotLoggingIn = createAuthenticationContext('');

const MockConsumerComponentNotLoggingIn = () => {
  const { setIsLoading, isLoading, isAuthenticated, login, logout, getAccessToken } =
    authenticationContextNotLoggingIn.useContext();
  return (
    <div>
      <button data-id="set-is-loading-button" onClick={() => setIsLoading(true)}>
        set is loading
      </button>
      <button data-id="login-button" onClick={() => login()}>
        login
      </button>
      <button data-id="logout-button" onClick={() => logout()}>
        logout
      </button>
      <button data-id="get-access-token-button" onClick={() => getAccessToken()}>
        logout
      </button>
      testing
      <div data-id="is-loading-check">is loading: {JSON.stringify(isLoading)}</div>
      <div data-id="is-authenticated-check">is authenticated: {JSON.stringify(isAuthenticated)}</div>
    </div>
  );
};

const MockComponentNotLoggingIn = ({ children }: any) => {
  return (
    <authenticationContextNotLoggingIn.Provider>
      <MockConsumerComponentNotLoggingIn />
    </authenticationContextNotLoggingIn.Provider>
  );
};

const authenticationContextLoggingIn = createAuthenticationContext('?code=code&state=state');

const MockConsumerComponentLoggingIn = () => {
  const { setIsLoading, isLoading, isAuthenticated, login, logout, getAccessToken } =
    authenticationContextLoggingIn.useContext();
  return (
    <div>
      <button data-id="set-is-loading-button" onClick={() => setIsLoading(true)}>
        set is loading
      </button>
      <button data-id="login-button" onClick={() => login()}>
        login
      </button>
      <button data-id="logout-button" onClick={() => logout()}>
        logout
      </button>
      <button data-id="get-access-token-button" onClick={() => getAccessToken()}>
        logout
      </button>
      testing
      <div data-id="is-loading-check">is loading: {JSON.stringify(isLoading)}</div>
      <div data-id="is-authenticated-check">is authenticated: {JSON.stringify(isAuthenticated)}</div>
    </div>
  );
};

const MockComponentLoggingIn = ({ children }: any) => {
  return (
    <authenticationContextLoggingIn.Provider>
      <MockConsumerComponentLoggingIn />
    </authenticationContextLoggingIn.Provider>
  );
};

const selectors = {
  setIsLoadingButton: '[data-id="set-is-loading-button"]',
  loginButton: '[data-id="login-button"]',
  logoutButton: '[data-id="logout-button"]',
  getAccessTokenButton: '[data-id="get-access-token-button"]',
  isLoadingCheck: '[data-id="is-loading-check"]',
  isAuthenticatedCheck: '[data-id="is-authenticated-check"]',
};

describe('authentication context', () => {
  it('works properly when logged in check is valid', () => {
    const auth0ClientMock = { handleRedirectCallback: () => {}, isAuthenticated: () => {} } as unknown as Auth0Client;
    const handleRedirectCallbackStub = cy.stub(auth0ClientMock, 'handleRedirectCallback');
    const isAuthenticatedStub = cy.stub(auth0ClientMock, 'isAuthenticated').resolves(true);
    const getClientStub = cy.stub(authenticationUtils, 'getClient').as('getClientStub');

    getClientStub.resolves(auth0ClientMock);

    mount(<MockComponentNotLoggingIn />);

    cy.get(selectors.isLoadingCheck).contains('false');
    cy.get(selectors.isAuthenticatedCheck).contains('true');

    cy.get('@getClientStub').then(() => {
      expect(getClientStub.callCount).to.equal(1);
      expect(getClientStub.getCall(0).args).to.deep.equal([]);
      expect(handleRedirectCallbackStub.callCount).to.equal(0);
      expect(isAuthenticatedStub.callCount).to.equal(1);
      expect(isAuthenticatedStub.getCall(0).args).to.deep.equal([]);
    });
  });

  it('works properly when logged in check fails', () => {
    const auth0ClientMock = { handleRedirectCallback: () => {}, isAuthenticated: () => {} } as unknown as Auth0Client;
    const handleRedirectCallbackStub = cy.stub(auth0ClientMock, 'handleRedirectCallback');
    const isAuthenticatedStub = cy.stub(auth0ClientMock, 'isAuthenticated').resolves(true);
    const getClientStub = cy.stub(authenticationUtils, 'getClient').as('getClientStub');

    getClientStub.rejects(auth0ClientMock);

    mount(<MockComponentNotLoggingIn />);

    cy.get(selectors.isLoadingCheck).contains('false');
    cy.get(selectors.isAuthenticatedCheck).contains('false');

    cy.get('@getClientStub').then(() => {
      expect(getClientStub.callCount).to.equal(1);
      expect(getClientStub.getCall(0).args).to.deep.equal([]);
      expect(handleRedirectCallbackStub.callCount).to.equal(0);
      expect(isAuthenticatedStub.callCount).to.equal(0);
    });
  });

  it('works properly when not logged in check is invalid', () => {
    const auth0ClientMock = { handleRedirectCallback: () => {}, isAuthenticated: () => {} } as unknown as Auth0Client;
    const handleRedirectCallbackStub = cy.stub(auth0ClientMock, 'handleRedirectCallback');
    const isAuthenticatedStub = cy.stub(auth0ClientMock, 'isAuthenticated').resolves(false);
    const getClientStub = cy.stub(authenticationUtils, 'getClient').as('getClientStub');

    getClientStub.resolves(auth0ClientMock);

    mount(<MockComponentNotLoggingIn />);

    cy.get(selectors.isLoadingCheck).contains('false');
    cy.get(selectors.isAuthenticatedCheck).contains('false');

    cy.get('@getClientStub').then(() => {
      expect(getClientStub.callCount).to.equal(1);
      expect(getClientStub.getCall(0).args).to.deep.equal([]);
      expect(handleRedirectCallbackStub.callCount).to.equal(0);
      expect(isAuthenticatedStub.callCount).to.equal(1);
      expect(isAuthenticatedStub.getCall(0).args).to.deep.equal([]);
    });
  });

  it('works properly when processing login', () => {
    const auth0ClientMock = { handleRedirectCallback: () => {}, isAuthenticated: () => {} } as unknown as Auth0Client;
    const handleRedirectCallbackStub = cy.stub(auth0ClientMock, 'handleRedirectCallback');
    const isAuthenticatedStub = cy.stub(auth0ClientMock, 'isAuthenticated').resolves(false);
    const getClientStub = cy.stub(authenticationUtils, 'getClient').as('getClientStub');

    getClientStub.resolves(auth0ClientMock);

    mount(<MockComponentLoggingIn />);

    cy.get(selectors.isLoadingCheck).contains('false');
    cy.get(selectors.isAuthenticatedCheck).contains('false');

    cy.get('@getClientStub').then(() => {
      expect(getClientStub.callCount).to.equal(1);
      expect(getClientStub.getCall(0).args).to.deep.equal([]);
      expect(handleRedirectCallbackStub.callCount).to.equal(1);
      expect(handleRedirectCallbackStub.getCall(0).args).to.deep.equal([]);
      expect(isAuthenticatedStub.callCount).to.equal(2);
      expect(isAuthenticatedStub.getCall(0).args).to.deep.equal([]);
      expect(isAuthenticatedStub.getCall(1).args).to.deep.equal([]);
    });
  });

  it('setting is loading works properly', () => {
    const auth0ClientMock = { isAuthenticated: () => {} } as unknown as Auth0Client;
    const isAuthenticatedStub = cy.stub(auth0ClientMock, 'isAuthenticated').resolves(false);
    const getClientStub = cy.stub(authenticationUtils, 'getClient').as('getClientStub');

    getClientStub.resolves(auth0ClientMock);

    mount(<MockComponentNotLoggingIn />);

    cy.get(selectors.isLoadingCheck).contains('false');

    cy.get(selectors.setIsLoadingButton).click();

    cy.get(selectors.isLoadingCheck).contains('true');

    cy.get('@getClientStub').then(() => {
      expect(getClientStub.callCount).to.equal(1);
      expect(getClientStub.getCall(0).args).to.deep.equal([]);
      expect(isAuthenticatedStub.callCount).to.equal(1);
      expect(isAuthenticatedStub.getCall(0).args).to.deep.equal([]);
    });
  });

  it('login works properly', () => {
    const auth0ClientMock = { loginWithRedirect: () => {}, isAuthenticated: () => {} } as unknown as Auth0Client;
    const loginWithRedirectStub = cy.stub(auth0ClientMock, 'loginWithRedirect');
    const isAuthenticatedStub = cy.stub(auth0ClientMock, 'isAuthenticated').resolves(false);
    const getClientStub = cy.stub(authenticationUtils, 'getClient').as('getClientStub');

    getClientStub.resolves(auth0ClientMock);

    mount(<MockComponentNotLoggingIn />);

    cy.get(selectors.loginButton).click();

    cy.get('@getClientStub').then(() => {
      expect(getClientStub.callCount).to.equal(1);
      expect(getClientStub.getCall(0).args).to.deep.equal([]);
      expect(isAuthenticatedStub.callCount).to.equal(1);
      expect(isAuthenticatedStub.getCall(0).args).to.deep.equal([]);
      expect(loginWithRedirectStub.callCount).to.equal(1);
      expect(loginWithRedirectStub.getCall(0).args).to.deep.equal([{ redirect_uri: 'http://localhost:4000' }]);
    });
  });

  it('logout works properly', () => {
    const auth0ClientMock = { logout: () => {}, isAuthenticated: () => {} } as unknown as Auth0Client;
    const logoutStub = cy.stub(auth0ClientMock, 'logout');
    const isAuthenticatedStub = cy.stub(auth0ClientMock, 'isAuthenticated').resolves(true);
    const getClientStub = cy.stub(authenticationUtils, 'getClient').as('getClientStub');

    getClientStub.resolves(auth0ClientMock);

    mount(<MockComponentNotLoggingIn />);

    cy.get(selectors.logoutButton).click();

    cy.get('@getClientStub').then(() => {
      expect(getClientStub.callCount).to.equal(1);
      expect(getClientStub.getCall(0).args).to.deep.equal([]);
      expect(isAuthenticatedStub.callCount).to.equal(1);
      expect(isAuthenticatedStub.getCall(0).args).to.deep.equal([]);
      expect(logoutStub.callCount).to.equal(1);
      expect(logoutStub.getCall(0).args).to.deep.equal([{ returnTo: 'http://localhost:4000/login' }]);
    });
  });

  it('getting access token works properly', () => {
    const auth0ClientMock = { getTokenSilently: () => {}, isAuthenticated: () => {} } as unknown as Auth0Client;
    const getTokenSilentlyStub = cy.stub(auth0ClientMock, 'getTokenSilently');
    const isAuthenticatedStub = cy.stub(auth0ClientMock, 'isAuthenticated').resolves(true);
    const getClientStub = cy.stub(authenticationUtils, 'getClient').as('getClientStub');

    getClientStub.resolves(auth0ClientMock);

    mount(<MockComponentNotLoggingIn />);

    cy.get(selectors.getAccessTokenButton).click();

    cy.get('@getClientStub').then(() => {
      expect(getClientStub.callCount).to.equal(1);
      expect(getClientStub.getCall(0).args).to.deep.equal([]);
      expect(isAuthenticatedStub.callCount).to.equal(1);
      expect(isAuthenticatedStub.getCall(0).args).to.deep.equal([]);
      expect(getTokenSilentlyStub.callCount).to.equal(1);
      expect(getTokenSilentlyStub.getCall(0).args).to.deep.equal([{ redirect_uri: window.location.origin }]);
    });
  });
});
