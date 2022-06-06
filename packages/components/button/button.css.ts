import { style } from '@vanilla-extract/css';
import { cssVariables } from '$components/button/styles';
import { ButtonContext, ButtonIconPosition, ButtonSize, ButtonVariant } from '$components/button/types';
import { theme } from '$utils/style';

export const Container = style({
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
      borderColor: cssVariables.theme.light.safe.borderColor,
      backgroundColor: cssVariables.theme.light.safe.backgroundColor,
      color: cssVariables.theme.light.safe.color,
    },
    [`&[data-context='${ButtonContext.SAFE}']:hover`]: {
      backgroundColor: cssVariables.theme.light.safe.backgroundColorFocused,
    },
    [`&[data-context='${ButtonContext.SAFE}']:active`]: {
      backgroundColor: cssVariables.theme.light.safe.backgroundColorActive,
    },
    [`&[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.GHOST}'], 
      &[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.OUTLINE}']`]: {
      color: cssVariables.theme.light.safe.colorOutline,
      backgroundColor: cssVariables.theme.light.safe.backgroundColorOutline,
    },
    [`&[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.GHOST}']:hover, 
      &[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.OUTLINE}']:hover`]: {
      backgroundColor: cssVariables.theme.light.safe.backgroundColorOutlineFocused,
    },
    [`&[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.GHOST}']:hover, 
      &[data-context='${ButtonContext.SAFE}'][data-variant='${ButtonVariant.OUTLINE}']:active`]: {
      backgroundColor: cssVariables.theme.light.safe.backgroundColorOutlineActive,
    },

    // primary
    [`&[data-context='${ButtonContext.PRIMARY}']`]: {
      borderColor: cssVariables.theme.light.primary.borderColor,
      backgroundColor: cssVariables.theme.light.primary.backgroundColor,
      color: cssVariables.theme.light.primary.color,
    },
    [`&[data-context='${ButtonContext.PRIMARY}']:hover`]: {
      backgroundColor: cssVariables.theme.light.primary.backgroundColorFocused,
    },
    [`&[data-context='${ButtonContext.PRIMARY}']:active`]: {
      backgroundColor: cssVariables.theme.light.primary.backgroundColorActive,
    },
    [`&[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.GHOST}'], 
      &[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.OUTLINE}']`]: {
      color: cssVariables.theme.light.primary.colorOutline,
      backgroundColor: cssVariables.theme.light.primary.backgroundColorOutline,
    },
    [`&[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.GHOST}']:hover, 
      &[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.OUTLINE}']:hover`]: {
      backgroundColor: cssVariables.theme.light.primary.backgroundColorOutlineFocused,
    },
    [`&[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.GHOST}']:hover, 
      &[data-context='${ButtonContext.PRIMARY}'][data-variant='${ButtonVariant.OUTLINE}']:active`]: {
      backgroundColor: cssVariables.theme.light.primary.backgroundColorOutlineActive,
    },

    // warning
    [`&[data-context='${ButtonContext.WARNING}']`]: {
      borderColor: cssVariables.theme.light.warning.borderColor,
      backgroundColor: cssVariables.theme.light.warning.backgroundColor,
      color: cssVariables.theme.light.warning.color,
    },
    [`&[data-context='${ButtonContext.WARNING}']:hover`]: {
      backgroundColor: cssVariables.theme.light.warning.backgroundColorFocused,
    },
    [`&[data-context='${ButtonContext.WARNING}']:active`]: {
      backgroundColor: cssVariables.theme.light.warning.backgroundColorActive,
    },
    [`&[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.GHOST}'], 
      &[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.OUTLINE}']`]: {
      color: cssVariables.theme.light.warning.colorOutline,
      backgroundColor: cssVariables.theme.light.warning.backgroundColorOutline,
    },
    [`&[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.GHOST}']:hover, 
      &[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.OUTLINE}']:hover`]: {
      backgroundColor: cssVariables.theme.light.warning.backgroundColorOutlineFocused,
    },
    [`&[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.GHOST}']:hover, 
      &[data-context='${ButtonContext.WARNING}'][data-variant='${ButtonVariant.OUTLINE}']:active`]: {
      backgroundColor: cssVariables.theme.light.warning.backgroundColorOutlineActive,
    },

    // danger
    [`&[data-context='${ButtonContext.DANGER}']`]: {
      borderColor: cssVariables.theme.light.danger.borderColor,
      backgroundColor: cssVariables.theme.light.danger.backgroundColor,
      color: cssVariables.theme.light.danger.color,
    },
    [`&[data-context='${ButtonContext.DANGER}']:hover`]: {
      backgroundColor: cssVariables.theme.light.danger.backgroundColorFocused,
    },
    [`&[data-context='${ButtonContext.DANGER}']:active`]: {
      backgroundColor: cssVariables.theme.light.danger.backgroundColorActive,
    },
    [`&[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.GHOST}'], 
      &[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.OUTLINE}']`]: {
      color: cssVariables.theme.light.danger.colorOutline,
      backgroundColor: cssVariables.theme.light.danger.backgroundColorOutline,
    },
    [`&[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.GHOST}']:hover, 
      &[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.OUTLINE}']:hover`]: {
      backgroundColor: cssVariables.theme.light.danger.backgroundColorOutlineFocused,
    },
    [`&[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.GHOST}']:hover, 
      &[data-context='${ButtonContext.DANGER}'][data-variant='${ButtonVariant.OUTLINE}']:active`]: {
      backgroundColor: cssVariables.theme.light.danger.backgroundColorOutlineActive,
    },
    [`&[data-variant='${ButtonVariant.GHOST}'][data-variant='${ButtonVariant.GHOST}']`]: {
      borderColor: 'transparent',
    },
    [`&[data-variant='${ButtonVariant.LINK}'][data-variant='${ButtonVariant.LINK}']`]: {
      color: theme.light.color.text.link,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    [`&[data-variant='${ButtonVariant.LINK}'][data-variant='${ButtonVariant.LINK}']:hover`]: {
      color: theme.light.color.text.linkHover,
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
