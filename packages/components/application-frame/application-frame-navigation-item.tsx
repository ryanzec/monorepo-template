import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import { NavigateFunction, To } from 'react-router-dom';

import { styles } from '$/components/application-frame/application-frame.css';
import { routerUtils } from '$/utils/router';

export interface ApplicationFrameNavigationItemProps {
  icon: IconDefinition;
  text: string;
  navigateTo: string;
}

interface InternalOnNavigateParams {
  navigate: NavigateFunction;
  navigateTo: To;
}

export const internalOnNavigation = ({ navigate, navigateTo }: InternalOnNavigateParams) => {
  navigate(navigateTo);
};

const ApplicationFrameNavigationItem = ({ icon, text, navigateTo }: ApplicationFrameNavigationItemProps) => {
  const navigate = routerUtils.useNavigate();

  const onNavigate = useCallback(() => {
    internalOnNavigation({ navigate, navigateTo });
  }, [navigate, navigateTo]);

  return (
    <div
      className={styles.NavigationItem}
      role="button"
      tabIndex={0}
      data-id="item"
      key={text}
      onClick={onNavigate}
      // this is needed for a11y though not sure what this event should do
      onKeyPress={() => {}}
    >
      <FontAwesomeIcon className={styles.NavigationItemSvg} icon={icon} /> {text}
    </div>
  );
};

export default ApplicationFrameNavigationItem;
