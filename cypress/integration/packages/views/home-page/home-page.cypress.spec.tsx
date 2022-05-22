import React from 'react';
import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react';
import * as useToggledHook from '$hooks/use-toggled';
import * as cypressUtils from '$utils/cypress';
import authenticationContext from '$contexts/authentication';
import * as stories from '$views/home-page/home-page.stories';

const { CypressDefault } = composeStories(stories);

describe('home page', () => {
  it('clicking the test api button works', () => {
    const accessToken = 'faketoken';

    cy.stub(authenticationContext, 'useContext', () => {
      return {
        logout: cy.stub(),
        getAccessToken: cy.stub().returns(accessToken),
      };
    });

    // not really needed but using as an example of responding differently to the same url based on count
    const getResponses = cypressUtils.buildResponseCollection([
      { body: [{ id: 1 }] },
      { body: [{ id: 1 }, { id: 1 }] },
    ]);
    cy.intercept('GET', '/api/v1/pawns', (request) => {
      request.reply(getResponses.getNextResponse());
    });

    cy.viewport(1024, 768);
    mount(<CypressDefault />);

    cy.get('[data-id="test-api"]').click();

    cy.get('[data-id="loaded-pawns"]').should('be.visible');

    cy.get('[data-id="test-api"]').click();

    cy.get('[data-id="loaded-pawns"]').should('be.visible');

    console.log(Cypress.$('[data-id="loaded-pawns"]'));
  });

  it('clicking the test api button does not work when button is disabled', () => {
    cy.stub(useToggledHook, 'useToggled').returns({
      isToggled: true,
      toggle: cy.stub(),
    });

    cy.viewport(1024, 768);
    mount(<CypressDefault />);

    cy.get('[data-id="test-api"]').should('be.disabled');
  });
});
