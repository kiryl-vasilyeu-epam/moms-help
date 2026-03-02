import { createStyles } from '@utils';

export const styles = createStyles(
  ({ spacing, radii, colors, shadows, sizes }) => ({
    container: {
      maxWidth: sizes.maxFormWidth,
      padding: spacing.lg,
      borderRadius: radii.base,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: spacing.md,
      background: colors.backgroundAlt,
      boxShadow: shadows.lg,
      alignSelf: 'center',
    },
  }),
);
