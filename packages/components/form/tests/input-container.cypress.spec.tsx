import * as React from 'react';

import Form from '$/components/form/form';
import { cypressUtils } from '$/utils/cypress';

describe('input container', () => {
  it('works properly', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <Form.InputContainer>
          <Form.Label>label</Form.Label>
          <Form.Input type="text" placeholder="placeholder" register={cy.stub()} property="input" />
          <Form.ValidationMessage>valid message</Form.ValidationMessage>
        </Form.InputContainer>,
      ),
    );

    cy.get('[data-id="validation-message"]').should('have.length', 1);
  });
});
