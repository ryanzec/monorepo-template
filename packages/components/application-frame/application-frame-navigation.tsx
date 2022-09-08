import { faHouse, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import ApplicationFrameNavigationItem, {
  ApplicationFrameNavigationItemProps,
} from '$/components/application-frame/application-frame-navigation-item';
import { StyledNavigation } from '$/components/application-frame/styles';

const navigationItems: ApplicationFrameNavigationItemProps[] = [
  {
    icon: faHouse,
    text: 'Home',
    navigateTo: '/',
  },
  {
    icon: faPenToSquare,
    text: 'Form',
    navigateTo: '/complex-form',
  },
];

const ApplicationFrameNavigation = () => {
  return (
    <StyledNavigation data-id="navigation">
      {navigationItems.map((navigationItem) => {
        return <ApplicationFrameNavigationItem key={navigationItem.text} {...navigationItem} />;
      })}
    </StyledNavigation>
  );
};

export default ApplicationFrameNavigation;
