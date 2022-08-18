import * as React from 'react';

import Form from '$/components/form/form';
import { cypressUtils } from '$/utils/cypress';

describe('label', () => {
  it('works properly', () => {
    cy.mount(cypressUtils.addBasicWrapper(<Form.Label>label</Form.Label>));

    cy.get('[data-id="label"]').should('have.length', 1);
  });
});
