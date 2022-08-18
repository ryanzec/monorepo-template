import { createContext, useContext } from 'react';

import {
  ButtonContext,
  ButtonSize,
  ButtonVariant,
  DEFAULT_BUTTON_SIZE,
  DEFAULT_BUTTON_VARIANT,
} from '$/components/button/utils';

export interface ButtonGroupContextValue {
  context?: ButtonContext;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  isAttached?: boolean;
}

export const ButtonGroupContext = createContext<ButtonGroupContextValue>({
  variant: DEFAULT_BUTTON_VARIANT,
  size: DEFAULT_BUTTON_SIZE,
});

export const useButtonGroupContext = (): ButtonGroupContextValue => {
  return useContext<ButtonGroupContextValue>(ButtonGroupContext);
};
