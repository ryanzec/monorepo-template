import React, { ReactElement, Context } from 'react';

export type GenericComponentProps = React.HTMLProps<React.HTMLAttributes<HTMLElement>>;

// generic hook related types
export type ReactUseState<T> = [T, (value: T) => void];

export interface ReactContextImplementation<T> {
  // using pascal case as it is used as a react components
  Provider: (props: GenericComponentProps) => ReactElement;
  context: Context<T>;
  useContext: () => T;
}

export interface CustomReactContext<T, F> extends ReactContextImplementation<T> {
  createContext: F;
}
