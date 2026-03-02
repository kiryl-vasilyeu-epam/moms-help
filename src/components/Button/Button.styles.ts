import { createStyles } from '@utils';

export const styles = createStyles(
  ({ spacing, fontSizes, colors, radii, shadows, sizes }) => ({
    button: {
      padding: '15px',
      fontSize: fontSizes.base,
      color: colors.white,
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
      background: colors.gradient,
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
