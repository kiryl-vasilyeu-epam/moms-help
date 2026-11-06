import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ spacing, colors, fontSizes }) => ({
    container: {
      display: 'flex',
      minWidth: '240px',
    },
    badge: {
      display: 'flex',
      width: '100%',
    },
    openButton: {
      width: '100%',
      minHeight: '56px',
      fontSize: fontSizes.lg,
    },
    modalTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${colors.border}`,
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.md,
      paddingTop: `${spacing.lg} !important`,
    },
    rows: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.md,
    },
    addRow: {
      alignSelf: 'flex-start',
    },
    actions: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: spacing.md,
      padding: spacing.lg,
      borderTop: `1px solid ${colors.border}`,
    },
  }),
);
