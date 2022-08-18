import React from 'react';
import { UseFormRegister, Path } from 'react-hook-form';

import { formCss } from '$/components/form/form.css';

export interface InputProps<TFormData> {
  property: Path<TFormData>;
  register: UseFormRegister<TFormData>;
}

export const Input = <TFormData,>({
  property,
  register,
  ...restOfProps
}: InputProps<TFormData> & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  return (
    <input className={formCss.input} data-id="input" {...register(property)} {...restOfProps} autoComplete="off" />
  );
};

// by default, we should be using the input the auto hooks with react-hook-form
export default Input;
