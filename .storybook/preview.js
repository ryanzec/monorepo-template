import '../applications/web/src/normalize.css';

import React from 'react';
import { useState, useCallback,  useEffect } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { applicationSettingsContext } from '$/contexts/application-settings';
import {darkTheme, lightTheme} from "../packages/utils/theme.css";

const MainWrapper = ({children}) => {
  const {theme, setTheme} = applicationSettingsContext.useContext();

  useEffect(() => {
    setTheme('light');
  }, []);

  const onUpdateTheme = useCallback((event) => {
    setTheme(event.target.value);
  }, [theme, setTheme]);

  return (
    <div className={theme === 'light' ? lightTheme : darkTheme}>
      <input type="radio" value="light" name="theme" onChange={onUpdateTheme} checked={theme === 'light'} /> light{' '}
      <input type="radio" value="dark" name="theme" onChange={onUpdateTheme} checked={theme === 'dark'} /> dark
      {children}
    </div>
  );
}

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
    )
  },
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
