import * as React from 'react';
import { mount } from '@cypress/react';
import { cypressUtils } from '$utils/cypress';
import { Label } from '$components/forms/label';
import { Input } from '$components/forms/input';
import { InputContainer } from '$components/forms/input-container';
import { ValidationMessage } from '$components/forms/validation-message';
import { UseFormRegister } from 'react-hook-form';

describe('input container', () => {
  it('works properly', () => {
    mount(
      cypressUtils.addBasicWrapper(
        <InputContainer>
          <Label>label</Label>
          <Input type="text" placeholder="placeholder" register={cy.stub()} property="input" />
          <ValidationMessage>valid message</ValidationMessage>
        </InputContainer>,
      ),
    );

    cy.get('[data-id="validation-message"]').should('have.length', 1);
  });
});
