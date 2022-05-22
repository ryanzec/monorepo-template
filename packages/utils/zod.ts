import * as zod from 'zod';

// this is the recommended why for checking a zod schema in sync with referencing type
// reference: https://github.com/colinhacks/zod/issues/372#issuecomment-826380330
export const schemaForType =
  <T>() =>
  // disabling the using of any of using any in the recommended approach for making sure a zod schema match a
  // typescript type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <S extends zod.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };
