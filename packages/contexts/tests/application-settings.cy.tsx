import React, { useCallback } from 'react';

import { applicationSettingsContext } from '$/contexts/application-settings';
import { ThemeName } from '$/types/theme';

const applicationSettingsContextTest = applicationSettingsContext.createContext();

const MockConsumerComponent = () => {
  const { theme, setTheme } = applicationSettingsContextTest.useContext();

  const onToggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? ThemeName.DARK : ThemeName.LIGHT);
  }, [theme, setTheme]);

  return (
    <div>
      <button data-id="toggle-theme-button" onClick={onToggleTheme}>
        toggle theme
      </button>
      <div data-id="theme-check">theme: {theme}</div>
    </div>
  );
};

const MockComponent = () => {
  return (
    <applicationSettingsContextTest.Provider>
      <MockConsumerComponent />
    </applicationSettingsContextTest.Provider>
  );
};

const selectors = {
  toggleThemeButton: '[data-id="toggle-theme-button"]',
  themeCheck: '[data-id="theme-check"]',
};

describe('application settings context', () => {
  it('can set theme', () => {
    cy.mount(<MockComponent />);

    cy.get(selectors.themeCheck).should('contain', 'light');

    cy.get(selectors.toggleThemeButton).click();

    cy.get(selectors.themeCheck).should('contain', 'dark');

    cy.get(selectors.toggleThemeButton).click();

    cy.get(selectors.themeCheck).should('contain', 'light');
  });
});
