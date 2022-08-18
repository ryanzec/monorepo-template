import * as React from 'react';

import Form from '$/components/form/form';
import { cypressUtils } from '$/utils/cypress';

describe('input', () => {
  it('works properly', () => {
    const registerStub = cy.stub().as('registerStub');

    cy.mount(
      cypressUtils.addBasicWrapper(
        <Form.Input type="text" placeholder="placeholder" register={registerStub} property="input" />,
      ),
    );

    cy.get('[data-id="input"]').should('have.length', 1);
    cy.get('@registerStub').then(() => {
      expect(registerStub.callCount).to.equal(1);
      expect(registerStub.getCall(0).args).to.deep.equal(['input']);
    });
  });
});
