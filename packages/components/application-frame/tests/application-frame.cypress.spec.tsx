import * as React from 'react';
import { routerUtils } from '$/utils/router';
import { applicationSettingsContext } from '$/contexts/application-settings';
import { authenticationContext } from '$/contexts/authentication';
import ApplicationFrame from '$/components/application-frame/application-frame';
import { cypressUtils } from '$/utils/cypress';

const selectors = {
  frame: '[data-id="frame"]',
  navigation: '[data-id="frame"] [data-id="navigation"]',
  navigationItems: '[data-id="frame"] [data-id="navigation"] [data-id="item"]',
  header: '[data-id="frame"] [data-id="header"]',
  headerActions: '[data-id="frame"] [data-id="header"] [data-id="actions"]',
  logoutButton: '[data-id="frame"] [data-id="header"] [data-id="logout"]',
  toggleThemeButton: '[data-id="frame"] [data-id="header"] [data-id="toggle-theme"]',
};

describe('application frame', () => {
  it('works when not authenticated', () => {
    cy.stub(authenticationContext, 'useContext').returns({
      logout: cy.stub(),
      isAuthenticated: false,
    });

    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addBasicWrapper(<ApplicationFrame>Testing</ApplicationFrame>));

    cy.get(selectors.frame).should('exist');
    cy.get(selectors.navigation).should('not.exist');
    cy.get(selectors.header).should('not.exist');
    cy.get(selectors.headerActions).should('not.exist');
  });

  it('works when authenticated', () => {
    cy.stub(authenticationContext, 'useContext').returns({
      logout: cy.stub(),
      isAuthenticated: true,
    });

    const navigateStub = cy.stub().as('navigateStub');

    cy.stub(routerUtils, 'useNavigate', () => navigateStub).as('useNavigateStub');

    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addBasicWrapper(<ApplicationFrame>Testing</ApplicationFrame>));

    cy.get(selectors.frame).should('exist');
    cy.get(selectors.navigation).should('exist');
    cy.get(selectors.header).should('exist');
    cy.get(selectors.headerActions).should('exist');
  });

  it('side navigation links work properly', () => {
    cy.stub(authenticationContext, 'useContext').returns({
      logout: cy.stub(),
      isAuthenticated: true,
    });

    const navigateStub = cy.stub().as('navigateStub');

    cy.stub(routerUtils, 'useNavigate', () => navigateStub).as('useNavigateStub');

    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addBasicWrapper(<ApplicationFrame>Testing</ApplicationFrame>));

    cy.get(selectors.navigationItems).eq(0).click();

    cy.get('@useNavigateStub').should('have.callCount', 2);
    cy.get('@navigateStub').should('have.callCount', 1);
  });

  it('logging out works properly', () => {
    const logoutStub = cy.stub().as('logoutStub');

    cy.stub(authenticationContext, 'useContext').returns({
      logout: logoutStub,
      isAuthenticated: true,
    });

    const navigateStub = cy.stub().as('navigateStub');

    cy.stub(routerUtils, 'useNavigate', () => navigateStub).as('useNavigateStub');

    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addBasicWrapper(<ApplicationFrame>Testing</ApplicationFrame>));

    cy.get(selectors.logoutButton).click();

    cy.get('@logoutStub').then(() => {
      expect(logoutStub.callCount).to.equal(1);
      expect(logoutStub.getCall(0).args).to.deep.equal([]);
    });
  });

  it('toggling theme works properly', () => {
    cy.stub(authenticationContext, 'useContext').returns({
      isAuthenticated: true,
    });

    const setThemeStub = cy.stub().as('setThemeStub');

    cy.stub(applicationSettingsContext, 'useContext').returns({
      theme: 'light',
      setTheme: setThemeStub,
    });

    const navigateStub = cy.stub();

    cy.stub(routerUtils, 'useNavigate', () => navigateStub).as('useNavigateStub');

    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addBasicWrapper(<ApplicationFrame>Testing</ApplicationFrame>));

    cy.get(selectors.toggleThemeButton).click();

    cy.get('@setThemeStub').then(() => {
      expect(setThemeStub.callCount).to.equal(1);
      expect(setThemeStub.getCall(0).args).to.deep.equal(['dark']);
    });
  });
});
