import * as React from 'react';

import ValidationMessage from '$/components/validation-message';
import { cypressUtils } from '$/utils/cypress';

describe('label', () => {
  it('works properly', () => {
    cy.mount(cypressUtils.addBasicWrapper(<ValidationMessage>validation message</ValidationMessage>));

    cy.get('[data-id="validation-message"]').contains('validation message');
  });
});
