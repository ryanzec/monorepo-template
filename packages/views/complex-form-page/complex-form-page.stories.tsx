import React from 'react';
import { ComplexFormPage } from '$views/complex-form-page/complex-form-page';

export default {
  title: 'Packages/View/ComplexFormPage',
  component: ComplexFormPage,
};

export const CypressDefault = () => {
  return <ComplexFormPage />;
};
CypressDefault.args = {};
