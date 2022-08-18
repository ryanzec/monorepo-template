import React from 'react';

import { reactHooks } from '$/hooks';

const MockComponent = ({ children }: any) => {
  const { isToggled, setIsToggled, toggle } = reactHooks.useToggled(false);

  return (
    <div>
      <button data-id="set-id-toggled-button" onClick={() => setIsToggled(true)}>
        set is toggled
      </button>
      <button data-id="toggle-button" onClick={() => toggle()}>
        toggle
      </button>
      <div data-id="is-toggled-check">is toggled: {JSON.stringify(isToggled)}</div>
    </div>
  );
};

const selectors = {
  setIsToggledButton: '[data-id="set-id-toggled-button"]',
  toggleButton: '[data-id="toggle-button"]',
  isToggledCheck: '[data-id="is-toggled-check"]',
};

describe('use toggled hook', () => {
  it('set is toggled work properly', () => {
    cy.mount(<MockComponent />);

    cy.get(selectors.isToggledCheck).contains('false');

    cy.get(selectors.setIsToggledButton).click();

    cy.get(selectors.isToggledCheck).contains('true');
  });

  it('set is toggle work properly', () => {
    cy.mount(<MockComponent />);

    cy.get(selectors.isToggledCheck).contains('false');

    cy.get(selectors.toggleButton).click();

    cy.get(selectors.isToggledCheck).contains('true');

    cy.get(selectors.toggleButton).click();

    cy.get(selectors.isToggledCheck).contains('false');
  });
});
