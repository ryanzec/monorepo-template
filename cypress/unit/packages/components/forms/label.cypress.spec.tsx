import * as React from 'react';
import { mount } from '@cypress/react';
import { cypressUtils } from '$utils/cypress';
import { Label } from '$components/forms/label';
import { Input } from '$components/forms/input';
import { InputContainer } from '$components/forms/input-container';
import { ValidationMessage } from '$components/forms/validation-message';
import { UseFormRegister } from 'react-hook-form';

describe('label', () => {
  it('works properly', () => {
    mount(cypressUtils.addBasicWrapper(<Label>label</Label>));

    cy.get('[data-id="label"]').should('have.length', 1);
  });
});
