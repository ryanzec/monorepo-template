import classnames from 'classnames';
import React from 'react';
import { UseFormRegister, Path, FieldValues } from 'react-hook-form';

import styles from '$/components/input/input.module.css';

interface InputProps<TFormData extends FieldValues> {
  property: Path<TFormData>;
  register: UseFormRegister<TFormData>;
}

const InputHooked = <TFormData extends FieldValues>({
  property,
  register,
  ...restOfProps
}: InputProps<TFormData> & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  return (
    <input
      data-id="input"
      className={classnames(styles['input'])}
      {...register(property)}
      {...restOfProps}
      autoComplete="off"
    />
  );
};

export default InputHooked;
