import '../packages/styles/variables.css';
import '../packages/styles/normalize.css';

import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { applicationSettingsContext } from '$/contexts/application-settings';
import { ThemeName } from '../packages/types/styles';

const MainWrapper = ({ children }) => {
  // @todo(!!!) how to load theme
  const theme = ThemeName.LIGHT;

  const onUpdateTheme = useCallback(
    (event) => {
      // setTheme(event.target.value);
    },
    [theme],
  );

  return (
    <div data-theme={theme}>
      <input type="radio" value="light" name="theme" onChange={onUpdateTheme} checked={theme === 'light'} /> light{' '}
      <input type="radio" value="dark" name="theme" onChange={onUpdateTheme} checked={theme === 'dark'} /> dark
      {children}
    </div>
  );
};

export const decorators = [
  (Story) => {
    return (
      <DndProvider backend={HTML5Backend}>
        <applicationSettingsContext.Provider>
          <MainWrapper>
            <Story />
          </MainWrapper>
        </applicationSettingsContext.Provider>
      </DndProvider>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
