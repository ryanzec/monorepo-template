import { style } from '@vanilla-extract/css';
import { cssVariables } from '$components/button/styles';
import { ButtonContext, ButtonIconPosition, ButtonSize, ButtonVariant } from '$components/button/types';
import { themeVariables } from '$utils/theme.css';

export const Container = style({
  color: themeVariables.color.text.light,
  borderRadius: cssVariables.container.borderRadius,
  border: '1px solid transparent',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  selectors: {
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
      borderColor: themeVariables.color.safe.base,
      backgroundColor: themeVariables.color.safe.base,
      color: themeVariables.color.text.light,
    },
    [`&[data-context='${ButtonContext.SAFE}']:hover`]: {
      backgroundColor: themeVariables.color.safe.dark,
    },
    [`&[data-context='${ButtonContext.SAFE}']:active`]: {
      backgroundColor: themeVariables.color.safe.xDark,
    },
    [`&[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.GHOST}'], 
      &[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.OUTLINE}']`]: {
      color: themeVariables.color.safe.dark,
      backgroundColor: themeVariables.color.transparent,
    },
    [`&[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.GHOST}']:hover, 
      &[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.OUTLINE}']:hover`]: {
      backgroundColor: themeVariables.color.safe.xxxLight,
    },
    [`&[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.GHOST}']:hover, 
      &[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.OUTLINE}']:active`]: {
      backgroundColor: themeVariables.color.safe.xxLight,
    },

    // primary
    [`&[data-context='${ButtonContext.PRIMARY}']`]: {
      borderColor: themeVariables.color.notice.base,
      backgroundColor: themeVariables.color.notice.base,
      color: themeVariables.color.text.light,
    },
    [`&[data-context='${ButtonContext.PRIMARY}']:hover`]: {
      backgroundColor: themeVariables.color.notice.dark,
    },
    [`&[data-context='${ButtonContext.PRIMARY}']:active`]: {
      backgroundColor: themeVariables.color.notice.xDark,
    },
    [`&[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.GHOST}'], 
      &[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.OUTLINE}']`]: {
      color: themeVariables.color.notice.dark,
      backgroundColor: themeVariables.color.transparent,
    },
    [`&[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.GHOST}']:hover, 
      &[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.OUTLINE}']:hover`]: {
      backgroundColor: themeVariables.color.notice.xxxLight,
    },
    [`&[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.GHOST}']:hover, 
      &[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.OUTLINE}']:active`]: {
      backgroundColor: themeVariables.color.notice.xxLight,
    },

    // warning
    [`&[data-context='${ButtonContext.WARNING}']`]: {
      borderColor: themeVariables.color.warning.base,
      backgroundColor: themeVariables.color.warning.base,
      color: themeVariables.color.text.light,
    },
    [`&[data-context='${ButtonContext.WARNING}']:hover`]: {
      backgroundColor: themeVariables.color.warning.dark,
    },
    [`&[data-context='${ButtonContext.WARNING}']:active`]: {
      backgroundColor: themeVariables.color.warning.xDark,
    },
    [`&[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.GHOST}'], 
      &[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.OUTLINE}']`]: {
      color: themeVariables.color.warning.dark,
      backgroundColor: themeVariables.color.transparent,
    },
    [`&[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.GHOST}']:hover, 
      &[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.OUTLINE}']:hover`]: {
      backgroundColor: themeVariables.color.warning.xxxLight,
    },
    [`&[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.GHOST}']:hover, 
      &[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.OUTLINE}']:active`]: {
      backgroundColor: themeVariables.color.warning.xxLight,
    },

    // danger
    [`&[data-context='${ButtonContext.DANGER}']`]: {
      borderColor: themeVariables.color.danger.base,
      backgroundColor: themeVariables.color.danger.base,
      color: themeVariables.color.text.light,
    },
    [`&[data-context='${ButtonContext.DANGER}']:hover`]: {
      backgroundColor: themeVariables.color.danger.dark,
    },
    [`&[data-context='${ButtonContext.DANGER}']:active`]: {
      backgroundColor: themeVariables.color.danger.xDark,
    },
    [`&[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.GHOST}'], 
      &[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.OUTLINE}']`]: {
      color: themeVariables.color.danger.dark,
      backgroundColor: themeVariables.color.transparent,
    },
    [`&[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.GHOST}']:hover, 
      &[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.OUTLINE}']:hover`]: {
      backgroundColor: themeVariables.color.danger.xxxLight,
    },
    [`&[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.GHOST}']:hover, 
      &[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.OUTLINE}']:active`]: {
      backgroundColor: themeVariables.color.danger.xxLight,
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
});

export const Icon = style({
  display: 'inline-flex',
});

export const IconSvg = style({
  width: '16px',
  height: '16px',
  selectors: {
    [`${Icon}[data-position='${ButtonIconPosition.PRE}'] &`]: {
      marginRight: cssVariables.icon.marginVan,
    },
    [`${Icon}[data-position='${ButtonIconPosition.POST}'] &`]: {
      marginLeft: cssVariables.icon.marginVan,
    },
  },
  [`${Icon}[data-state='is-loading'] &`]: {
    animationName: 'spin',
    animationDuration: '2000ms',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
});
