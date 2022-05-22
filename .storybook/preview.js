import React from 'react';
import { useState, useCallback } from 'react';
import { ThemeProvider } from '@emotion/react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import GlobalStyles from '$components/global-styles/global-styles';

// @todo: needed to figure out how to apply different themes
export const decorators = [
  (Story) => {
    const [themeName, setThemeName] = useState('light');

    const onUpdateTheme = useCallback((event) => {
      setThemeName(event.target.value);
    }, []);

    const theme = { name: themeName};

    return (
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={theme}>
          <input type="radio" value="light" name="themeName" onChange={onUpdateTheme} checked={themeName === 'light'} /> light{' '}
          <input type="radio" value="dark" name="themeName" onChange={onUpdateTheme} checked={themeName === 'dark'} /> dark
          <GlobalStyles />
          <Story theme={theme} />
        </ThemeProvider>
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
