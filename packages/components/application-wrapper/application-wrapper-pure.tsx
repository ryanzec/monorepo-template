import React from 'react';

import { ThemeName } from '$/types/styles';

export interface ApplicationWrapperPureProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  theme: ThemeName;
}

const ApplicationWrapperPure = ({ theme, ...restOfProps }: ApplicationWrapperPureProps) => {
  return <div data-id="application-wrapper" data-theme={theme} {...restOfProps} />;
};

export default ApplicationWrapperPure;
