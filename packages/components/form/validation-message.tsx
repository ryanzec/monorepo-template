import React from 'react';

import { formCss } from '$/components/form/form.css';

type ValidationMessageProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ValidationMessage = ({ children, ...restOfProps }: ValidationMessageProps) => {
  return (
    <div className={formCss.validationMessage} data-id="validation-message" {...restOfProps}>
      {children}
    </div>
  );
};

export default ValidationMessage;
