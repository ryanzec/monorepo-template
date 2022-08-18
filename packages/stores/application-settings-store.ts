import produce from 'immer';
import { BehaviorSubject } from 'rxjs';

import { ThemeName } from '$/types/styles';

export interface ApplicationSettingsState {
  theme: ThemeName;
}

export type ToggleSubject = BehaviorSubject<ApplicationSettingsState>;

const initialState: ApplicationSettingsState = {
  // @todo(feature) pull default based on os theme
  theme: ThemeName.LIGHT,
};

const subject = new BehaviorSubject<ApplicationSettingsState>(initialState);

const setTheme = (subject: ToggleSubject, theme: ThemeName) => {
  const state = subject.getValue();

  subject.next(
    produce(state, (draft) => {
      draft.theme = theme;
    }),
  );
};

export const applicationSettingsStoreUtils = {
  initialState,
  subject,
  setTheme,
};
