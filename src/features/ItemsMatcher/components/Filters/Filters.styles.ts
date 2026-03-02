import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ spacing, fontSizes, colors, sizes, transitions }) => ({
    filterButtons: {
      display: 'flex',
      gap: spacing.sm,
      marginBottom: spacing.lg,
      flexWrap: 'wrap',
      alignItems: 'center',
      opacity: 1,
      transition: `opacity ${transitions.fast} ease`,
    },
    loadingIndicator: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: spacing.xs,
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
    },
    spinner: {
      display: 'inline-block',
      width: sizes.spinnerSize,
      height: sizes.spinnerSize,
      border: '2px solid #e0e0e0',
      borderTop: `2px solid ${colors.info}`,
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
      '@keyframes spin': {
        to: { transform: 'rotate(360deg)' },
      },
    },
  }),
);
