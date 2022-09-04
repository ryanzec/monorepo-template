import React from 'react';

import { authenticationContext } from '$/contexts/authentication';
import { reactHooks } from '$/hooks';
import { apiUtils } from '$/utils/api';
import { cypressUtils } from '$/utils/cypress';
import HomePage from '$/views/home-page/home-page';

describe('home page', () => {
  it('clicking the test api button works', () => {
    const apiGetStub = cy.stub(apiUtils.appApi, 'get').as('apiGetStub');

    apiGetStub.onCall(0).resolves({ data: [{ id: 1 }] });
    apiGetStub.onCall(1).resolves({ data: [{ id: 1 }, { id: 1 }] });

    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addApplicationFrameWrapper(<HomePage />));

    cy.get('[data-id="test-api"]').click();

    cy.get('[data-id="loaded-pawns"]').should('be.visible');

    cy.get('[data-id="test-api"]').click();

    cy.get('[data-id="loaded-pawns"]').should('be.visible');

    cy.get('@apiGetStub').then(() => {
      expect(apiGetStub.callCount).to.equal(2);
      expect(apiGetStub.getCall(0).args).to.deep.equal(['/pawns']);
      expect(apiGetStub.getCall(0).args).to.deep.equal(['/pawns']);
    });
  });

  it('clicking the test api button does not work when button is disabled', () => {
    cy.stub(reactHooks, 'useToggled').returns({
      isToggled: true,
      toggle: cy.stub(),
    });

    cy.viewport(1024, 768);
    cy.mount(cypressUtils.addApplicationFrameWrapper(<HomePage />));

    cy.get('[data-id="test-api"]').should('be.disabled');
  });
});
