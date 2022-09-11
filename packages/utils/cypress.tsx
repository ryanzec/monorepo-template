import type { HttpResponseInterceptor, StaticResponse } from 'cypress/types/net-stubbing';

import { ThemeProvider } from '@emotion/react';
import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import sinon from 'sinon';

import ApplicationFrame from '$/components/application-frame';
import { applicationSettingsContext } from '$/contexts/application-settings';
import { authenticationContext } from '$/contexts/authentication';
import { routerUtils } from '$/utils/router';
import { ThemeName } from '$/utils/style';

import Agent = Cypress.Agent;

// this seems to be the standard typing of a cypress stub which is needed for some of the utility method's return data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CypressStub = Omit<sinon.SinonStub<any[], any>, 'withArgs'> & Agent<sinon.SinonStub<any[], any>>;

const buildResponseCollection = (test: Array<StaticResponse | HttpResponseInterceptor | undefined>) => {
  const responses = test;
  let nextResponseIndex = 0;

  return {
    getNextResponse: () => {
      if (nextResponseIndex >= responses.length) {
        throw Error('ran out of responses to return');
      }

      const nextResponse = responses[nextResponseIndex];

      nextResponseIndex++;

      return nextResponse;
    },
  };
};

const addBasicWrapper = (jsx: JSX.Element) => {
  return (
    <applicationSettingsContext.Provider>
      <ThemeProvider theme={{ name: ThemeName.LIGHT }}>
        <DndProvider backend={HTML5Backend}>{jsx}</DndProvider>
      </ThemeProvider>
    </applicationSettingsContext.Provider>
  );
};

const addApplicationFrameWrapper = (jsx: JSX.Element) => {
  return addBasicWrapper(<ApplicationFrame>{jsx}</ApplicationFrame>);
};

interface setupNavigateStubReturns {
  navigateStub: CypressStub;
  useNavigateStub: CypressStub;
}

const setupNavigateStub = (): setupNavigateStubReturns => {
  const navigateStub = cy.stub().as('navigateStub');
  const useNavigateStub = cy.stub(routerUtils, 'useNavigate').as('useNavigateStub');

  useNavigateStub.returns(navigateStub);

  return {
    navigateStub,
    useNavigateStub,
  };
};

interface SetupAuthenticationStubParams {
  isAuthenticated?: boolean;
  loginRedirectUrl?: string;
  isLoading?: boolean;
}

interface AuthenticationContextStub {
  logout: CypressStub;
  login: CypressStub;
  finishLogin: CypressStub;
  isAuthenticated: boolean;
  loginRedirectUrl: string;
  isLoading: boolean;
}

interface SetupAuthenticationStubReturns {
  useAuthenticationContextStub: CypressStub;
  authenticationContextStub: AuthenticationContextStub;
}

const setupAuthenticationStub = (params?: SetupAuthenticationStubParams): SetupAuthenticationStubReturns => {
  const loginStub = cy.stub().as('loginStub');
  const finishLoginStub = cy.stub().as('finishLoginStub');
  const logoutStub = cy.stub().as('logoutStub');
  const authenticationContextStub: AuthenticationContextStub = {
    login: loginStub,
    finishLogin: finishLoginStub,
    logout: logoutStub,
    isAuthenticated: params?.isAuthenticated !== false,
    loginRedirectUrl: params?.loginRedirectUrl ?? '',
    isLoading: params?.isLoading === true,
  };
  const useAuthenticationContextStub = cy.stub(authenticationContext, 'useContext').as('useAuthenticationContextStub');

  useAuthenticationContextStub.returns(authenticationContextStub);

  return {
    useAuthenticationContextStub,
    authenticationContextStub,
  };
};

interface SetupApplicationSettingsContextStubParams {
  theme: ThemeName;
}

interface ApplicationSettingsContextStub {
  setTheme: CypressStub;
  theme: ThemeName;
}

interface SetupApplicationSettingsContextStubReturns {
  useApplicationSettingsContextStub: CypressStub;
  applicationSettingsContextStub: ApplicationSettingsContextStub;
}

const setupApplicationSettingsContextStub = (
  params?: SetupApplicationSettingsContextStubParams,
): SetupApplicationSettingsContextStubReturns => {
  const setThemeStub = cy.stub().as('setThemeStub');
  const applicationSettingsContextStub: ApplicationSettingsContextStub = {
    theme: params?.theme ?? ThemeName.LIGHT,
    setTheme: setThemeStub,
  };
  const useApplicationSettingsContextStub = cy
    .stub(applicationSettingsContext, 'useContext')
    .as('useApplicationSettingsContextStub');

  useApplicationSettingsContextStub.returns(applicationSettingsContextStub);

  return {
    useApplicationSettingsContextStub,
    applicationSettingsContextStub,
  };
};

export const cypressUtils = {
  buildResponseCollection,
  addBasicWrapper,
  addApplicationFrameWrapper,
  setupNavigateStub,
  setupAuthenticationStub,
  setupApplicationSettingsContextStub,
};
