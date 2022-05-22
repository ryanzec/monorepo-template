import React, { createContext, useContext } from 'react';
import type { GenericComponentProps, ReactContextImplementation } from '$/types/react';

interface BuildProviderParams<T> {
  context: React.Context<T>;
  getState: () => T;
}

const buildProvider =
  <T,>({ context, getState }: BuildProviderParams<T>) =>
  ({ children }: GenericComponentProps) => {
    const state = getState();

    return <context.Provider value={state}>{children}</context.Provider>;
  };

const buildContext = <T,>(defaultValue: T, getState: () => T): ReactContextImplementation<T> => {
  const context = createContext<T>(defaultValue);
  const provider = buildProvider<T>({ context, getState });

  return {
    Provider: provider,
    context,
    useContext: (): T => useContext(context),
  };
};

export const reactUtils = {
  buildContext,
};
