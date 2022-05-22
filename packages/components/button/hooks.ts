import { createContext, useContext } from 'react';
import { ButtonContext, ButtonSize, ButtonVariant } from '$/components/button/common';

export interface ButtonGroupContextValue {
  'data-context'?: ButtonContext;
  'data-size': ButtonSize;
  'data-variant': ButtonVariant;
  disabled?: boolean;
  isAttached?: boolean;
}

export const ButtonGroupContext = createContext<ButtonGroupContextValue>({
  'data-variant': ButtonVariant.SOLID,
  'data-size': ButtonSize.MEDIUM,
});

export const useButtonGroupContext = (): ButtonGroupContextValue => {
  return useContext<ButtonGroupContextValue>(ButtonGroupContext);
};
