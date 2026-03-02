import { createStyleSheet } from '@utils';

export const styleSheet = createStyleSheet(
  ({ spacing, fontSizes, colors, radii, shadows }) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.lg,
      overflowY: 'auto',
      maxHeight: '60vh',
    },
    title: {
      fontWeight: 'bold',
      fontSize: fontSizes.xxl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    combination: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.md,
      background: colors.backgroundModal,
      fontSize: fontSizes.base,
      padding: spacing.sm,
      borderRadius: radii.base,
      boxShadow: shadows.md,
    },
    sumValue: {
      fontWeight: 'bold',
    },
    suffix: {
      fontStyle: 'italic',
    },
    reportIcon: {
      marginRight: spacing.xs,
    },
  }),
);
