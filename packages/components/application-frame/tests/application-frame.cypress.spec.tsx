import * as React from 'react';

import ApplicationFrame from '$/components/application-frame/application-frame';
import { applicationSettingsContext } from '$/contexts/application-settings';
import { authenticationContext } from '$/contexts/authentication';
import { cypressUtils } from '$/utils/cypress';
import { routerUtils } from '$/utils/router';

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
    cypressUtils.setupAuthenticationStub({
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
    cypressUtils.setupAuthenticationStub();
    cypressUtils.setupNavigateStub();

    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addBasicWrapper(<ApplicationFrame>Testing</ApplicationFrame>));

    cy.get(selectors.frame).should('exist');
    cy.get(selectors.navigation).should('exist');
    cy.get(selectors.header).should('exist');
    cy.get(selectors.headerActions).should('exist');
  });

  it('side navigation links work properly', () => {
    cypressUtils.setupAuthenticationStub();
    cypressUtils.setupNavigateStub();

    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addBasicWrapper(<ApplicationFrame>Testing</ApplicationFrame>));

    cy.get(selectors.navigationItems).eq(0).click();

    cy.get('@useNavigateStub').should('have.callCount', 2);
    cy.get('@navigateStub').should('have.callCount', 1);
  });

  it('logging out works properly', () => {
    const { authenticationContextStub } = cypressUtils.setupAuthenticationStub();
    cypressUtils.setupNavigateStub();

    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addBasicWrapper(<ApplicationFrame>Testing</ApplicationFrame>));

    cy.get(selectors.logoutButton).click();

    cy.get('@logoutStub').then(() => {
      expect(authenticationContextStub.logout.callCount).to.equal(1);
      expect(authenticationContextStub.logout.getCall(0).args).to.deep.equal([]);
    });
  });

  it('toggling theme works properly', () => {
    const { applicationSettingsContextStub } = cypressUtils.setupApplicationSettingsContextStub();
    cypressUtils.setupAuthenticationStub();
    cypressUtils.setupNavigateStub();

    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addBasicWrapper(<ApplicationFrame>Testing</ApplicationFrame>));

    cy.get(selectors.toggleThemeButton).click();

    cy.get('@setThemeStub').then(() => {
      expect(applicationSettingsContextStub.setTheme.callCount).to.equal(1);
      expect(applicationSettingsContextStub.setTheme.getCall(0).args).to.deep.equal(['dark']);
    });
  });
});
