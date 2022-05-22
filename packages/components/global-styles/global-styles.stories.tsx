import { RequiresChildrenComponent } from '$types/react';
import { ThemeName } from '$types/theme';

import React from 'react';

import { theme } from '$utils/styles';

interface ColorBlockProps {
  color: string;
  name: string;
}

const ColorBlockContainer = ({ children }: RequiresChildrenComponent) => {
  return <div style={{ display: 'flex' }}>{children}</div>;
};

const ColorBlock = ({ color, name }: ColorBlockProps) => {
  return (
    <div style={{ flex: '1', height: '50px', backgroundColor: color }}>
      {name} : {color}
    </div>
  );
};

export default {
  title: 'Packages/Components/Global Styles',
};

interface StorybookContext {
  theme: {
    name: ThemeName;
  };
}

export const Colors = (args: never, context: StorybookContext) => {
  return (
    <>
      <div>Safe</div>
      <ColorBlockContainer>
        <ColorBlock color={theme[context.theme.name].color.safe.xxxLight} name="xxLight" />
        <ColorBlock color={theme[context.theme.name].color.safe.xxLight} name="xxLight" />
        <ColorBlock color={theme[context.theme.name].color.safe.xLight} name="xLight" />
        <ColorBlock color={theme[context.theme.name].color.safe.light} name="light" />
        <ColorBlock color={theme[context.theme.name].color.safe.base} name="base" />
        <ColorBlock color={theme[context.theme.name].color.safe.dark} name="dark" />
        <ColorBlock color={theme[context.theme.name].color.safe.xDark} name="xDark" />
        <ColorBlock color={theme[context.theme.name].color.safe.xxDark} name="xxDark" />
        <ColorBlock color={theme[context.theme.name].color.safe.xxxDark} name="xxxDark" />
      </ColorBlockContainer>
      <div>Notice</div>
      <ColorBlockContainer>
        <ColorBlock color={theme[context.theme.name].color.notice.xxxLight} name="xxxLight" />
        <ColorBlock color={theme[context.theme.name].color.notice.xxLight} name="xxLight" />
        <ColorBlock color={theme[context.theme.name].color.notice.xLight} name="xLight" />
        <ColorBlock color={theme[context.theme.name].color.notice.light} name="light" />
        <ColorBlock color={theme[context.theme.name].color.notice.base} name="base" />
        <ColorBlock color={theme[context.theme.name].color.notice.dark} name="dark" />
        <ColorBlock color={theme[context.theme.name].color.notice.xDark} name="xDark" />
        <ColorBlock color={theme[context.theme.name].color.notice.xxDark} name="xxDark" />
        <ColorBlock color={theme[context.theme.name].color.notice.xxxDark} name="xxxDark" />
      </ColorBlockContainer>
      <div>Warning</div>
      <ColorBlockContainer>
        <ColorBlock color={theme[context.theme.name].color.warning.xxxLight} name="xxxLight" />
        <ColorBlock color={theme[context.theme.name].color.warning.xxLight} name="xxLight" />
        <ColorBlock color={theme[context.theme.name].color.warning.xLight} name="xLight" />
        <ColorBlock color={theme[context.theme.name].color.warning.light} name="light" />
        <ColorBlock color={theme[context.theme.name].color.warning.base} name="base" />
        <ColorBlock color={theme[context.theme.name].color.warning.dark} name="dark" />
        <ColorBlock color={theme[context.theme.name].color.warning.xDark} name="xDark" />
        <ColorBlock color={theme[context.theme.name].color.warning.xxDark} name="xxDark" />
        <ColorBlock color={theme[context.theme.name].color.warning.xxxDark} name="xxxDark" />
      </ColorBlockContainer>
      <div>Danger</div>
      <ColorBlockContainer>
        <ColorBlock color={theme[context.theme.name].color.danger.xxxLight} name="xxxLight" />
        <ColorBlock color={theme[context.theme.name].color.danger.xxLight} name="xxLight" />
        <ColorBlock color={theme[context.theme.name].color.danger.xLight} name="xLight" />
        <ColorBlock color={theme[context.theme.name].color.danger.light} name="light" />
        <ColorBlock color={theme[context.theme.name].color.danger.base} name="base" />
        <ColorBlock color={theme[context.theme.name].color.danger.dark} name="dark" />
        <ColorBlock color={theme[context.theme.name].color.danger.xDark} name="xDark" />
        <ColorBlock color={theme[context.theme.name].color.danger.xxDark} name="xxDark" />
        <ColorBlock color={theme[context.theme.name].color.danger.xxxDark} name="xxxDark" />
      </ColorBlockContainer>
    </>
  );
};
