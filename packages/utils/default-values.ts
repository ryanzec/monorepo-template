// allow any here as it jut make it easier to create default state setter for default context state
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const noopStateSetter = (value: any) => {};

const noop = () => {};

export const defaultValuesUtils = {
  noopStateSetter,
  noop,
};
