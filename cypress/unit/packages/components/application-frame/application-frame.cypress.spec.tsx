import * as React from 'react';
import * as routerUtils from '$utils/router';
import { mount } from '@cypress/react';
import authenticationContext from '$contexts/authentication';
import * as component from '$components/application-frame/application-frame';
import * as cypressUtils from '$utils/cypress';

const selectors = {
  frame: '[data-id="frame"]',
  navigation: '[data-id="frame"] [data-id="navigation"]',
  navigationItems: '[data-id="frame"] [data-id="navigation"] [data-id="item"]',
  header: '[data-id="frame"] [data-id="header"]',
  headerActions: '[data-id="frame"] [data-id="header"] [data-id="actions"]',
  logoutButton: '[data-id="frame"] [data-id="header"] [data-id="logout"]',
};

describe('application frame', () => {
  it('works when not authenticated', () => {
    cy.stub(authenticationContext, 'useContext').returns({
      logout: cy.stub(),
      isAuthenticated: false,
    });

    cy.viewport(1024, 768);
    mount(cypressUtils.addBasicWrapper(<component.ApplicationFrame>Testing</component.ApplicationFrame>));

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
    mount(cypressUtils.addBasicWrapper(<component.ApplicationFrame>Testing</component.ApplicationFrame>));

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
    mount(cypressUtils.addBasicWrapper(<component.ApplicationFrame>Testing</component.ApplicationFrame>));

    cy.get(selectors.navigationItems).eq(0).click();

    cy.get('@useNavigateStub').should('have.callCount', 2);
    cy.get('@navigateStub').should('have.callCount', 1);
  });

  it('logging out works properly', () => {
    cy.stub(authenticationContext, 'useContext').returns({
      logout: cy.stub().as('logoutStub'),
      isAuthenticated: true,
    });

    const navigateStub = cy.stub().as('navigateStub');

    cy.stub(routerUtils, 'useNavigate', () => navigateStub).as('useNavigateStub');

    cy.viewport(1024, 768);
    mount(cypressUtils.addBasicWrapper(<component.ApplicationFrame>Testing</component.ApplicationFrame>));

    cy.get(selectors.logoutButton).click();

    cy.get('@logoutStub').should('have.callCount', 1);
  });
});
