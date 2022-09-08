import '../applications/web/src/normalize.css';

import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { applicationSettingsContext } from '$/contexts/application-settings';
import { ThemeName } from '../packages/utils/style';

const MainWrapper = ({ children }) => {
  const { theme, setTheme } = applicationSettingsContext.useContext();

  useEffect(() => {
    setTheme('light');
  }, []);

  const onUpdateTheme = useCallback(
    (event) => {
      setTheme(event.target.value);
    },
    [theme, setTheme],
  );

  return (
    <div className={theme === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT}>
      <input type="radio" value="light" name="theme" onChange={onUpdateTheme} checked={theme === 'light'} /> light{' '}
      <input type="radio" value="dark" name="theme" onChange={onUpdateTheme} checked={theme === 'dark'} /> dark
      {children}
    </div>
  );
};

export const decorators = [
  (Story) => {
    return (
      <ThemeProvider theme={{ name: ThemeName.LIGHT }}>
        <DndProvider backend={HTML5Backend}>
          <applicationSettingsContext.Provider>
            <MainWrapper>
              <Story />
            </MainWrapper>
          </applicationSettingsContext.Provider>
        </DndProvider>
      </ThemeProvider>
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
