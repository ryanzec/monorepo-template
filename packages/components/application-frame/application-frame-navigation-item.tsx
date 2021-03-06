import React, { useCallback } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { routerUtils } from '$/utils/router';
import { applicationFrameCss } from '$/components/application-frame/application-frame.css';

export interface NavigationItemProps {
  icon: IconDefinition;
  text: string;
  navigateTo: string;
}

export const ApplicationFrameNavigationItem = ({ icon, text, navigateTo }: NavigationItemProps) => {
  const navigate = routerUtils.useNavigate();

  const onNavigate = useCallback(() => {
    navigate(navigateTo);
  }, [navigate, navigateTo]);

  return (
    <div className={applicationFrameCss.NavigationItem} data-id="item" key={text} onClick={onNavigate}>
      <FontAwesomeIcon className={applicationFrameCss.NavigationItemSvg} icon={icon} /> {text}
    </div>
  );
};

export default ApplicationFrameNavigationItem;
