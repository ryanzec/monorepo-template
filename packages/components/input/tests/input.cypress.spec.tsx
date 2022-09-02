import * as React from 'react';

import Input from '$/components/input';
import Label from '$/components/label';
import ValidationMessage from '$/components/validation-message';
import { cypressUtils } from '$/utils/cypress';

describe('input container', () => {
  it('works properly', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <Input.Container>
          <Label>label</Label>
          <Input.Hooked type="text" placeholder="placeholder" register={cy.stub()} property="input" />
          <ValidationMessage>validation message</ValidationMessage>
        </Input.Container>,
      ),
    );

    cy.get('[data-id="label"]').contains('label');
    cy.get('[data-id="input"]').invoke('attr', 'placeholder').should('contain', 'placeholder');
    cy.get('[data-id="validation-message"]').contains('validation message');
  });
});
