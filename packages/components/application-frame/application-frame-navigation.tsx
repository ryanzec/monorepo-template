import React from 'react';
import styled from '@emotion/styled';
import { cssVariables } from '$components/application-frame/styles';
import { faHouse, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  ApplicationFrameNavigationItem,
  NavigationItemProps,
} from '$components/application-frame/application-frame-navigation-item';

export const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #111111;
  flex: 0 0 ${cssVariables.navigation.width};
  align-self: stretch;
  padding: ${cssVariables.navigation.padding};

  svg {
    height: ${cssVariables.navigationIcon.height};
  }
`;

export const navigationItems: NavigationItemProps[] = [
  {
    icon: faHouse,
    text: 'Home',
    navigateTo: '/home',
  },
  {
    icon: faPenToSquare,
    text: 'Form',
    navigateTo: '/complex-form',
  },
];

export const ApplicationFrameNavigation = () => {
  return (
    <Navigation data-id="navigation">
      {navigationItems.map((navigationItem) => {
        return <ApplicationFrameNavigationItem key={navigationItem.text} {...navigationItem} />;
      })}
    </Navigation>
  );
};

export default ApplicationFrameNavigation;
