import React from 'react';
import { UseFormRegister, Path, FieldValues } from 'react-hook-form';

import { styles } from '$/components/input/input.css';

interface InputProps<TFormData extends FieldValues> {
  property: Path<TFormData>;
  register: UseFormRegister<TFormData>;
}

const InputHooked = <TFormData extends FieldValues>({
  property,
  register,
  ...restOfProps
}: InputProps<TFormData> & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  return <input className={styles.input} data-id="input" {...register(property)} {...restOfProps} autoComplete="off" />;
};

export default InputHooked;
