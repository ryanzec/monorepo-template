import { style } from '@vanilla-extract/css';

import { cssVariables, ButtonContext, ButtonIconPosition, ButtonSize, ButtonVariant } from '$/components/button/common';
import { styleUtils } from '$/utils/style';
import { themeVariables } from '$/utils/theme.css';

const group = style({
  display: 'inline-flex',
  alignItems: 'center',
});

const icon = style({
  display: 'inline-flex',
});

export const styles = {
  container: style({
    color: themeVariables.color.text.light,
    borderRadius: cssVariables.container.borderRadius,
    border: '1px solid transparent',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    selectors: {
      [`${group}[data-attached='true'] &`]: {
        borderRadius: 0,
      },
      [`${group}[data-attached='true'] &:first-child`]: {
        borderRadius: `${cssVariables.container.borderRadius} 0 0 ${cssVariables.container.borderRadius}`,
      },
      [`${group}[data-attached='true'] &:last-child`]: {
        borderRadius: `0 ${cssVariables.container.borderRadius} ${cssVariables.container.borderRadius} 0`,
      },
      [`${group}[data-attached='false'] &`]: {
        marginRight: styleUtils.getSpacing(1),
      },
      [`&[data-size='${ButtonSize.SMALL}']`]: {
        padding: cssVariables.container.padding[ButtonSize.SMALL],
        fontSize: cssVariables.container.fontSize[ButtonSize.SMALL],
      },
      [`&[data-size='${ButtonSize.MEDIUM}']`]: {
        padding: cssVariables.container.padding[ButtonSize.MEDIUM],
        fontSize: cssVariables.container.fontSize[ButtonSize.MEDIUM],
      },
      [`&[data-size='${ButtonSize.LARGE}']`]: {
        padding: cssVariables.container.padding[ButtonSize.LARGE],
        fontSize: cssVariables.container.fontSize[ButtonSize.LARGE],
      },
      '&[disabled]': {
        opacity: '0.5',
        cursor: 'not-allowed',
      },

      // safe
      [`&[data-context='${ButtonContext.SAFE}']`]: {
        borderColor: themeVariables.color.green.base,
        backgroundColor: themeVariables.color.green.base,
        color: themeVariables.color.text.light,
      },
      [`&[data-context='${ButtonContext.SAFE}']:hover`]: {
        backgroundColor: themeVariables.color.green.dark,
      },
      [`&[data-context='${ButtonContext.SAFE}']:active`]: {
        backgroundColor: themeVariables.color.green.xDark,
      },
      [`&[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.GHOST}'],
      &[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.OUTLINE}']`]: {
        color: themeVariables.color.green.dark,
        backgroundColor: 'transparent',
      },
      [`&[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.GHOST}']:hover,
      &[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.OUTLINE}']:hover`]: {
        backgroundColor: themeVariables.color.green.xxxLight,
      },
      [`&[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.GHOST}']:hover,
      &[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.OUTLINE}']:active`]: {
        backgroundColor: themeVariables.color.green.xxLight,
      },

      // primary
      [`&[data-context='${ButtonContext.PRIMARY}']`]: {
        borderColor: themeVariables.color.blue.base,
        backgroundColor: themeVariables.color.blue.base,
        color: themeVariables.color.text.light,
      },
      [`&[data-context='${ButtonContext.PRIMARY}']:hover`]: {
        backgroundColor: themeVariables.color.blue.dark,
      },
      [`&[data-context='${ButtonContext.PRIMARY}']:active`]: {
        backgroundColor: themeVariables.color.blue.xDark,
      },
      [`&[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.GHOST}'],
      &[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.OUTLINE}']`]: {
        color: themeVariables.color.blue.dark,
        backgroundColor: 'transparent',
      },
      [`&[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.GHOST}']:hover,
      &[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.OUTLINE}']:hover`]: {
        backgroundColor: themeVariables.color.blue.xxxLight,
      },
      [`&[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.GHOST}']:hover,
      &[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.OUTLINE}']:active`]: {
        backgroundColor: themeVariables.color.blue.xxLight,
      },

      // warning
      [`&[data-context='${ButtonContext.WARNING}']`]: {
        borderColor: themeVariables.color.orange.base,
        backgroundColor: themeVariables.color.orange.base,
        color: themeVariables.color.text.light,
      },
      [`&[data-context='${ButtonContext.WARNING}']:hover`]: {
        backgroundColor: themeVariables.color.orange.dark,
      },
      [`&[data-context='${ButtonContext.WARNING}']:active`]: {
        backgroundColor: themeVariables.color.orange.xDark,
      },
      [`&[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.GHOST}'],
      &[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.OUTLINE}']`]: {
        color: themeVariables.color.orange.dark,
        backgroundColor: 'transparent',
      },
      [`&[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.GHOST}']:hover,
      &[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.OUTLINE}']:hover`]: {
        backgroundColor: themeVariables.color.orange.xxxLight,
      },
      [`&[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.GHOST}']:hover,
      &[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.OUTLINE}']:active`]: {
        backgroundColor: themeVariables.color.orange.xxLight,
      },

      // danger
      [`&[data-context='${ButtonContext.DANGER}']`]: {
        borderColor: themeVariables.color.red.base,
        backgroundColor: themeVariables.color.red.base,
        color: themeVariables.color.text.light,
      },
      [`&[data-context='${ButtonContext.DANGER}']:hover`]: {
        backgroundColor: themeVariables.color.red.dark,
      },
      [`&[data-context='${ButtonContext.DANGER}']:active`]: {
        backgroundColor: themeVariables.color.red.xDark,
      },
      [`&[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.GHOST}'],
      &[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.OUTLINE}']`]: {
        color: themeVariables.color.red.dark,
        backgroundColor: 'transparent',
      },
      [`&[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.GHOST}']:hover,
      &[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.OUTLINE}']:hover`]: {
        backgroundColor: themeVariables.color.red.xxxLight,
      },
      [`&[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.GHOST}']:hover,
      &[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.OUTLINE}']:active`]: {
        backgroundColor: themeVariables.color.red.xxLight,
      },

      [`&[data-variant='${ButtonVariant.GHOST}'][data-variant='${ButtonVariant.GHOST}']`]: {
        borderColor: 'transparent',
      },
      [`&[data-variant='${ButtonVariant.LINK}'][data-variant='${ButtonVariant.LINK}']`]: {
        color: themeVariables.color.text.link,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      [`&[data-variant='${ButtonVariant.LINK}'][data-variant='${ButtonVariant.LINK}']:hover`]: {
        color: themeVariables.color.text.linkHover,
        textDecoration: 'underline',
      },
    },
  }),
  icon,
  iconSvg: style({
    width: '16px',
    height: '16px',
    selectors: {
      [`${icon}[data-position='${ButtonIconPosition.PRE}'] &`]: {
        marginRight: cssVariables.icon.marginVan,
      },
      [`${icon}[data-position='${ButtonIconPosition.POST}'] &`]: {
        marginLeft: cssVariables.icon.marginVan,
      },
      [`${icon}[data-state='is-loading'] &`]: {
        animationName: 'spin',
        animationDuration: '2000ms',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
      },
    },
  }),
  group,
};
