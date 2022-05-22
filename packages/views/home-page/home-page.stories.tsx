import React from 'react';
import HomePage from '$views/home-page/home-page';

export default {
  title: 'Packages/View/HomePage',
  component: HomePage,
};

export const CypressDefault = () => {
  return <HomePage />;
};
CypressDefault.args = {};
