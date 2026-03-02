import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ spacing, colors, shadows, fontSizes, radii }) => ({
    container: {
      alignSelf: 'center',
      flexDirection: 'column',
      display: 'flex',
      overflowY: 'auto',
      gap: spacing.lg,
      paddingTop: `${spacing.lg} !important`,
      backgroundColor: colors.backgroundSuccess,
    },
    modalTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${colors.border}`,
      boxShadow: shadows.md,
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
    },
    item: {
      borderRadius: radii.sm,
    },
  }),
);
