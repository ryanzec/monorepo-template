// this file is used a proxy to make mocking in tests possible
import { useNavigate as reactRouterUseNavigate } from 'react-router-dom';

const useNavigate = () => {
  return reactRouterUseNavigate();
};

export const routerUtils = {
  useNavigate,
};
