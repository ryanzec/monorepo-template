// this file is used a proxy to make mocking in tests possible
import { useNavigate as reactRouterUseNavigate } from 'react-router-dom';

export const useNavigate = () => {
  return reactRouterUseNavigate();
};
