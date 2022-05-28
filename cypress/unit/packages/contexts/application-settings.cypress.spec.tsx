import React, { useCallback } from 'react';
import { applicationSettingsContext } from '$contexts/application-settings';
import { mount } from '@cypress/react';

const applicationSettingsContextTest = applicationSettingsContext.createContext();

const MockConsumerComponent = () => {
  const { theme, setTheme } = applicationSettingsContextTest.useContext();

  const onToggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
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
    mount(<MockComponent />);

    cy.get(selectors.themeCheck).contains('light');

    cy.get(selectors.toggleThemeButton).click();

    cy.get(selectors.themeCheck).contains('dark');

    cy.get(selectors.toggleThemeButton).click();

    cy.get(selectors.themeCheck).contains('light');
  });
});
