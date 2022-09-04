import * as React from 'react';

import Label from '$/components/label';
import { cypressUtils } from '$/utils/cypress';

describe('label', () => {
  it('works properly', () => {
    cy.mount(cypressUtils.addBasicWrapper(<Label>label</Label>));

    cy.get('[data-id="label"]').should('contain', 'label');
  });
});
