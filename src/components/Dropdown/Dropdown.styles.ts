import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ colors, radii, shadows, spacing }) => ({
    dropdown: {
      background: colors.white,
      borderRadius: radii.base,
      boxShadow: shadows.xl,
      minWidth: '200px',
      padding: `${spacing.xs} 0`,
      marginTop: spacing.xxs,
    },
    content: {
      padding: `${spacing.xs} ${spacing.base}`,
    },
  }),
);
