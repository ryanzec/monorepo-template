import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React from 'react';

import { ButtonIconPosition, DEFAULT_BUTTON_ICON_POSITION } from '$/components/button/common';
import { StyledButtonIcon } from '$/components/button/styles';

export interface ButtonIconProps extends FontAwesomeIconProps {
  position?: ButtonIconPosition;
  isLoading?: boolean;
}

const ButtonIcon = ({
  position = DEFAULT_BUTTON_ICON_POSITION,
  isLoading = false,
  icon,
  ...restOfProps
}: ButtonIconProps) => {
  let dataId = 'icon';

  dataId += isLoading ? ' loading' : '';
  dataId += position === ButtonIconPosition.PRE ? ' pre' : ' post';

  return (
    <StyledButtonIcon
      data-id={dataId}
      position={position}
      isLoading={isLoading}
      icon={isLoading ? faSpinner : icon}
      {...restOfProps}
    />
  );
};

export default ButtonIcon;
