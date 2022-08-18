export const enum GlobalVariable {
  BASE_API_URL = 'base-api-url',
}

const getGlobalVariable = (variable: GlobalVariable) => {
  switch (variable) {
    case GlobalVariable.BASE_API_URL:
      return process.env.VITE_BASE_API_URL || '';

    default:
      // @todo(error)
      console.error(`could not find global variable ${GlobalVariable.BASE_API_URL}`);
  }
};

export const applicationUtils = {
  getGlobalVariable,
};
