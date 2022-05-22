import React, { createContext, useContext } from 'react';
import { OptionalChildrenComponent, ReactContext } from '$types/react';

interface BuildProviderParams<T> {
  context: React.Context<T>;
  getState: () => T;
}

const buildProvider =
  <T,>({ context, getState }: BuildProviderParams<T>) =>
  ({ children }: OptionalChildrenComponent) => {
    const state = getState();

    return <context.Provider value={state}>{children}</context.Provider>;
  };

export const buildContext = <T,>(defaultValue: T, getState: () => T): ReactContext<T> => {
  const context = createContext<T>(defaultValue);
  const provider = buildProvider<T>({ context, getState });

  return {
    Provider: provider,
    context,
    useContext: (): T => useContext(context),
  };
};
