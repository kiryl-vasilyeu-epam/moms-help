import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ spacing, radii, colors, shadows, sizes }) => ({
    container: {
      maxWidth: sizes.maxFormWidth,
      padding: spacing.lg,
      borderRadius: radii.base,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: spacing.md,
      background: colors.backgroundAlt2,
      boxShadow: shadows.lg,
      alignSelf: 'center',
    },
    newPercent: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.lg,
    },
    input: {
      width: '150px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
  }),
);
