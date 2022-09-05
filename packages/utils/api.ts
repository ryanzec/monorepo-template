import axios from 'axios';

const appApi = axios.create({
  baseURL: window.globalConfiguration?.apiBaseUri || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiUtils = {
  appApi,
};
