import * as React from 'react';
import { cypressUtils } from '$/utils/cypress';
import Form from '$/components/form/form';

describe('label', () => {
  it('works properly', () => {
    cy.mount(cypressUtils.addBasicWrapper(<Form.Label>label</Form.Label>));

    cy.get('[data-id="label"]').should('have.length', 1);
  });
});
