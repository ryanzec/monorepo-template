import React from 'react';

import { styles } from '$/components/validation-message/validation-message.css';

type ValidationMessageProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ValidationMessage = ({ children, ...restOfProps }: ValidationMessageProps) => {
  return (
    <div className={styles.validationMessage} data-id="validation-message" {...restOfProps}>
      {children}
    </div>
  );
};

export default ValidationMessage;
