import * as React from 'react';
import { mount } from '@cypress/react';
import * as cypressUtils from '$utils/cypress';
import { Label } from '$components/forms/label';
import { Input } from '$components/forms/input';
import { InputContainer } from '$components/forms/input-container';
import { ValidationMessage } from '$components/forms/validation-message';
import { UseFormRegister } from 'react-hook-form';

describe('input', () => {
  it('works properly', () => {
    const registerStub = cy.stub().as('registerStub');

    mount(
      cypressUtils.addBasicWrapper(
        <Input type="text" placeholder="placeholder" register={registerStub} property="input" />,
      ),
    );

    cy.get('[data-id="input"]').should('have.length', 1);
    cy.get('@registerStub').then(() => {
      expect(registerStub.callCount).to.equal(1);
      expect(registerStub.getCall(0).args).to.deep.equal(['input']);
    });
  });
});
