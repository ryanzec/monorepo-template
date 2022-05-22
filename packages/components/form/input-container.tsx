import React, { RefObject } from 'react';

import { formCss } from '$/components/form/form.css';

export type InputContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  selfRef?: RefObject<HTMLDivElement>;
};

export const InputContainer = ({ children, selfRef, ...restOfProps }: InputContainerProps) => {
  return (
    <div className={formCss.inputContainer} data-id="input-container" ref={selfRef} {...restOfProps}>
      {children}
    </div>
  );
};

export default InputContainer;
