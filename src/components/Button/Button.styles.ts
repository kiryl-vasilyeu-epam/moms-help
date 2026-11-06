import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ spacing, fontSizes, colors, radii, shadows, sizes }) => ({
    button: {
      padding: '15px',
      fontSize: fontSizes.base,
      color: colors.alwaysWhite,
      border: 'none',
      borderRadius: radii.base,
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s',
      '&:hover': {
        transform: 'scale(1.02)',
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        transform: 'none',
      },
    },
    buttonSmall: {
      padding: spacing.xs,
      fontSize: fontSizes.xs,
      borderRadius: radii.sm,
    },
    buttonPrimary: {
      background: colors.secondGradient,
    },
    buttonSuccess: {
      background: colors.successGradient,
      display: 'block',
      boxShadow: shadows.success,
    },
    buttonInfo: {
      background: colors.infoGradient,
      display: 'block',
      boxShadow: shadows.info,
    },
    buttonDanger: {
      background: colors.dangerGradient,
      display: 'block',
      boxShadow: shadows.danger,
    },
    buttonSoft: {
      background: colors.infoLight,
      color: colors.info,
      '&:hover': {
        transform: 'none',
        filter: 'brightness(0.96)',
      },
    },
    buttonOutline: {
      background: 'transparent',
      color: colors.primary,
      boxShadow: `inset 0 0 0 2px ${colors.primary}`,
      '&:hover': {
        transform: 'none',
        background: colors.backgroundHover,
      },
    },
    buttonDangerOutline: {
      background: 'transparent',
      color: colors.danger,
      boxShadow: `inset 0 0 0 2px ${colors.danger}`,
      '&:hover': {
        transform: 'none',
        background: colors.dangerLight,
      },
    },
    buttonClose: {
      background: colors.danger,
      width: sizes.buttonClose,
      height: sizes.buttonClose,
      padding: 0,
      fontSize: fontSizes.xxl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonCloseSmall: {
      background: colors.danger,
      width: sizes.buttonCloseSmall,
      height: sizes.buttonCloseSmall,
      padding: 0,
      fontSize: fontSizes.xs,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);
