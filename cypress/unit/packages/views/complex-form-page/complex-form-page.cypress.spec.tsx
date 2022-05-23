import React from 'react';
import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react';

import * as stories from '$views/complex-form-page/complex-form-page.stories';

const { CypressDefault } = composeStories(stories);

const selectors = {
  todoEmptyState: '[data-id="complex-form-page"] [data-id="todos"] [data-id="empty-state"]',
  todoItems: '[data-id="complex-form-page"] [data-id="todos"] [data-id="item"]',
  todoCompletedEmptyState: '[data-id="complex-form-page"] [data-id="todos-completed"] [data-id="empty-state"]',
  todoCompletedItems: '[data-id="complex-form-page"] [data-id="todos-completed"] [data-id="item"]',
};

describe('complex form page', () => {
  // this seems to testing react-dnd properly however it did take quite a few different sets of method that actually
  // worked so not sure this will work in all use cases but fingers crossed
  it('dragging todo items work properly', () => {
    cy.viewport(1024, 768);
    mount(<CypressDefault />);

    cy.get(selectors.todoEmptyState).should('not.exist');
    cy.get(selectors.todoItems).should('have.length', 2);
    cy.get(selectors.todoCompletedEmptyState).should('exist');
    cy.get(selectors.todoCompletedItems).should('not.exist');

    cy.get(selectors.todoItems).first().trigger('dragstart');
    cy.get(selectors.todoCompletedEmptyState).trigger('dragover');

    // the dragover trigger should make the todos completed empty state disappear and make the todos completed items
    // appear so we want to do the dragend trigger on the todos completed items selector to validate that
    cy.get(selectors.todoCompletedItems).trigger('dragend');

    cy.get(selectors.todoEmptyState).should('not.exist');
    cy.get(selectors.todoItems).should('have.length', 1);
    cy.get(selectors.todoCompletedEmptyState).should('not.exist');
    cy.get(selectors.todoCompletedItems).should('have.length', 1);

    cy.get(selectors.todoItems).first().trigger('dragstart');
    cy.get(selectors.todoCompletedItems).trigger('dragover').trigger('dragend');

    // the dragover trigger should make the todos completed items grow in size to 2 so we want to do the dragend
    // trigger on the todos second completed items selector to validate that
    cy.get(selectors.todoCompletedItems).eq(1).trigger('dragend');

    cy.get(selectors.todoEmptyState).should('exist');
    cy.get(selectors.todoItems).should('not.exist');
    cy.get(selectors.todoCompletedEmptyState).should('not.exist');
    cy.get(selectors.todoCompletedItems).should('have.length', 2);
  });
});
