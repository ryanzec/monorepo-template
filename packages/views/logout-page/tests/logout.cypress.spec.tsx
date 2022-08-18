import React from 'react';

import { authenticationContext } from '$/contexts/authentication';
import { cypressUtils } from '$/utils/cypress';
import LogoutPage from '$/views/logout-page/logout-page';

const selectors = {
  logoutPage: '[data-id="logout-page"]',
};

describe('logout page', () => {
  it('works properly', () => {
    const { useAuthenticationContextStub } = cypressUtils.setupAuthenticationStub({
      isAuthenticated: false,
    });

    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addApplicationFrameWrapper(<LogoutPage />));

    cy.get(selectors.logoutPage).should('exist');

    cy.get('@useAuthenticationContextStub').then(() => {
      expect(useAuthenticationContextStub.callCount).to.equal(1);
      expect(useAuthenticationContextStub.getCall(0).args).to.deep.equal([]);
    });
  });
});
