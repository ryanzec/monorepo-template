export interface LocalStorageCacheData {
  // any is being used as we do want to be able to store any kind of data here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  expires: number | boolean;
}

const get = (key: string) => {
  const now = new Date().getTime();
  const rawData = localStorage.getItem(key);

  if (!rawData) {
    return null;
  }

  // @todo(feature) handle when data is not valid json
  const storedData = JSON.parse(rawData);
  let returnData;

  if (storedData && storedData.expires && storedData.expires <= now) {
    //clean up expired data
    localStorage.removeItem(key);
  } else if (storedData) {
    returnData = storedData.value;
  }

  return returnData;
};

// any is being used as we do want to be able to store any kind of data here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const set = (key: string, value: any, expireIn = 0) => {
  const expires = new Date().getTime();

  const data: LocalStorageCacheData = {
    value: value,
    expires: expireIn > 0 ? expires + expireIn : false,
  };

  return localStorage.setItem(key, JSON.stringify(data));
};

const remove = (key: string) => {
  localStorage.removeItem(key);
};

const clear = () => {
  localStorage.clear();
};

export const localStorageCacheUtils = {
  get,
  set,
  remove,
  clear,
};
