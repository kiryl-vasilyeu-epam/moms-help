import { createSxStyles } from '@utils';

export const styles = createSxStyles(
  ({ spacing, colors, shadows, fontSizes }) => ({
    container: {
      alignSelf: 'center',
      flexDirection: 'column',
      display: 'flex',
      overflowY: 'auto',
      gap: spacing.lg,
      paddingTop: `${spacing.lg} !important`,
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
  }),
);
