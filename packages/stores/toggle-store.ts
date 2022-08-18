import produce from 'immer';
import { BehaviorSubject } from 'rxjs';

export interface ToggleState {
  isToggled: boolean;
}

export type ToggleSubject = BehaviorSubject<ToggleState>;

const initialState: ToggleState = {
  isToggled: false,
};

const generateSubject = (overrideInitialValues?: Partial<ToggleState>) => {
  return new BehaviorSubject<ToggleState>(Object.assign({}, initialState, overrideInitialValues ?? {}));
};

const toggleValue = (subject: ToggleSubject) => {
  const state = subject.getValue();

  subject.next(
    produce(state, (draft) => {
      draft.isToggled = !draft.isToggled;
    }),
  );
};

const setIsToggled = (subject: ToggleSubject, isToggled: boolean) => {
  const state = subject.getValue();

  subject.next(
    produce(state, (draft) => {
      draft.isToggled = isToggled;
    }),
  );
};

export const toggleStoreUtils = {
  initialState,
  generateSubject,
  toggleValue,
  setIsToggled,
};
