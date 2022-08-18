import { StoryFn } from '@storybook/react';
import React, { useCallback, useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';

import ApplicationFrame from '$/components/application-frame';
import ApplicationWrapperPure from '$/components/application-wrapper/application-wrapper-pure';
import { ThemeName } from '$/types/styles';

// this is needed for any component that uses a router hook (like useNavigate())
const ReactRouterDecorator = (Story: StoryFn<Partial<unknown>>) => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Story />} />
        <Route path="/complex-form" element={<Story />} />
      </Routes>
    </MemoryRouter>
  );
};

const AuthenticatedWrapperDecorator = (Story: StoryFn<Partial<unknown>>) => {
  const isAuthenticated = true;
  const [theme, setTheme] = useState(ThemeName.LIGHT);
  const onToggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT));
  }, []);
  const onLogout = () => {};

  return (
    <ApplicationWrapperPure theme={theme}>
      <MemoryRouter initialEntries={['/']}>
        <ApplicationFrame.Pure
          isAuthenticated={isAuthenticated}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onLogout={onLogout}
        >
          <Routes>
            <Route path="/" element={<Story />} />
            <Route path="/complex-form" element={<Story />} />
          </Routes>
        </ApplicationFrame.Pure>
      </MemoryRouter>
    </ApplicationWrapperPure>
  );
};

const UnauthenticatedWrapperDecorator = (Story: StoryFn<Partial<unknown>>) => {
  const isAuthenticated = false;
  const [theme, setTheme] = useState(ThemeName.LIGHT);
  const onToggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT));
  }, []);
  const onLogout = () => {};

  return (
    <ApplicationWrapperPure theme={theme}>
      <MemoryRouter initialEntries={['/']}>
        <ApplicationFrame.Pure
          isAuthenticated={isAuthenticated}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onLogout={onLogout}
        >
          <Routes>
            <Route path="/" element={<Story />} />
            <Route path="/complex-form" element={<Story />} />
          </Routes>
        </ApplicationFrame.Pure>
      </MemoryRouter>
    </ApplicationWrapperPure>
  );
};

export const storybookUtils = {
  ReactRouterDecorator,
  AuthenticatedWrapperDecorator,
  UnauthenticatedWrapperDecorator,
};
