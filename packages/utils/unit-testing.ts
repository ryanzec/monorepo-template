// this is meant to cast anything to another object for testing so allowing any here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const castAnyAs = <T>(value: any): T => {
  return value as unknown as T;
};

export const unitTestingUtils = {
  castAnyAs,
};
