import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ spacing, fontSizes, colors, radii }) => ({
    section: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.md,
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: radii.lg,
      padding: spacing.base,
    },
    sectionTitle: {
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
      margin: 0,
      paddingBottom: spacing.xs,
      borderBottom: `1px solid ${colors.sidebarBorder}`,
    },
  }),
);
