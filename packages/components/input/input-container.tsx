import React, { RefObject } from 'react';

import { styles } from '$/components/input/input.css';

type InputContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  selfRef?: RefObject<HTMLDivElement>;
};

const InputContainer = ({ children, selfRef, ...restOfProps }: InputContainerProps) => {
  return (
    <div className={styles.inputContainer} data-id="input-container" ref={selfRef} {...restOfProps}>
      {children}
    </div>
  );
};

export default InputContainer;
