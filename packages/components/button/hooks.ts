import { createContext, useContext } from 'react';
import { ButtonContext, ButtonSize, ButtonVariant } from '$components/button/types';

export interface ButtonGroupContextValue {
  context?: ButtonContext;
  size: ButtonSize;
  variant: ButtonVariant;
  disabled?: boolean;
  isAttached?: boolean;
}

export const ButtonGroupContext = createContext<ButtonGroupContextValue>({
  variant: ButtonVariant.SOLID,
  size: ButtonSize.MEDIUM,
});

export const useButtonGroupContext = (): ButtonGroupContextValue => {
  return useContext<ButtonGroupContextValue>(ButtonGroupContext);
};
