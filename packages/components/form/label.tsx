import React from 'react';

import { formCss } from '$/components/form/form.css';

export const Label = ({
  children,
  ...restOfProps
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLLabelElement>, HTMLLabelElement>) => {
  return (
    <label className={formCss.label} data-id="label" {...restOfProps}>
      {children}
    </label>
  );
};

export default Label;
