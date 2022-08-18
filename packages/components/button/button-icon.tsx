import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

import { buttonCss } from '$/components/button/button.css';

const ButtonIcon = (props: FontAwesomeIconProps) => {
  return <FontAwesomeIcon className={buttonCss.iconSvg} {...props} />;
};

export default ButtonIcon;
