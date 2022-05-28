import { ReactNode, ReactElement, Context } from 'react';

export interface RequiresChildrenComponent {
  children: ReactNode;
}

export interface OptionalChildrenComponent {
  children?: ReactNode;
}

// generic hook related types
export type ReactUseState<T> = [T, (value: T) => void];

export interface ReactContextImplementation<T> {
  // using pascal case as it is used as a react components
  Provider: (props: OptionalChildrenComponent) => ReactElement;
  context: Context<T>;
  useContext: () => T;
}

export interface CustomReactContext<T, F> extends ReactContextImplementation<T> {
  createContext: F;
}
