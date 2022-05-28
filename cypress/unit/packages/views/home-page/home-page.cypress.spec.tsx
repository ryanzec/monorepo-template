import React from 'react';
import { mount } from '@cypress/react';
import { useToggledHook } from '$hooks/use-toggled';
import { authenticationContext } from '$contexts/authentication';
import { cypressUtils } from '$utils/cypress';
import HomePage from '$views/home-page/home-page';
import { apiUtils } from '$utils/api';

describe('home page', () => {
  it('clicking the test api button works', () => {
    const accessToken = 'faketoken';

    cy.stub(authenticationContext, 'useContext', () => {
      return {
        logout: cy.stub(),
        getAccessToken: cy.stub().returns(accessToken),
      };
    });

    const apiGetStub = cy.stub(apiUtils.appApi, 'get').as('apiGetStub');

    apiGetStub.onCall(0).resolves({ data: [{ id: 1 }] });
    apiGetStub.onCall(1).resolves({ data: [{ id: 1 }, { id: 1 }] });

    cy.viewport(1024, 768);
    mount(cypressUtils.addApplicationFrameWrapper(<HomePage />));

    cy.get('[data-id="test-api"]').click();

    cy.get('[data-id="loaded-pawns"]').should('be.visible');

    cy.get('[data-id="test-api"]').click();

    cy.get('[data-id="loaded-pawns"]').should('be.visible');

    cy.get('@apiGetStub').then(() => {
      expect(apiGetStub.callCount).to.equal(2);
      expect(apiGetStub.getCall(0).args).to.deep.equal([
        '/pawns',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ]);
      expect(apiGetStub.getCall(0).args).to.deep.equal([
        '/pawns',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ]);
    });
  });

  it('clicking the test api button does not work when button is disabled', () => {
    cy.stub(useToggledHook, 'useToggled').returns({
      isToggled: true,
      toggle: cy.stub(),
    });

    cy.viewport(1024, 768);
    mount(cypressUtils.addApplicationFrameWrapper(<HomePage />));

    cy.get('[data-id="test-api"]').should('be.disabled');
  });
});
