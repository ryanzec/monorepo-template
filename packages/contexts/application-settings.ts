import { useState } from 'react';

import { CustomReactContext, ReactContextImplementation, ReactUseState } from '$/types/react';
import { ThemeName } from '$/types/theme';
import { reactUtils } from '$/utils/react';

export interface ApplicationSettingsContext {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const defaultValues: ApplicationSettingsContext = {
  theme: ThemeName.LIGHT,
  setTheme: () => {},
};

export type CreateApplicationSettingsContextFunc = () => ReactContextImplementation<ApplicationSettingsContext>;

const createContext: CreateApplicationSettingsContextFunc = () =>
  reactUtils.buildContext<ApplicationSettingsContext>(defaultValues, () => {
    const [theme, setTheme]: ReactUseState<ThemeName> = useState<ThemeName>(defaultValues.theme);

    return {
      theme,
      setTheme,
    };
  });

const defaultContext = createContext();

export const applicationSettingsContext: CustomReactContext<
  ApplicationSettingsContext,
  CreateApplicationSettingsContextFunc
> = {
  ...defaultContext,
  createContext,
};
