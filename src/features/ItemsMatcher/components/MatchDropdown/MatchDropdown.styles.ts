import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ spacing, fontSizes, colors }) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.sm,
      width: '400px',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      gap: spacing.xs,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: fontSizes.base,
      fontWeight: 'bold',
    },
    searchField: {
      flex: 1,
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      height: '300px',
      overflowY: 'auto',
    },
    listItem: {
      display: 'flex',
      padding: spacing.sm,
      alignItems: 'center',
      cursor: 'pointer',
      borderBottom: `1px solid ${colors.borderDark}`,
      '&:hover': {
        background: colors.infoLight,
      },
    },
    listItemEven: {
      background: colors.backgroundEven,
    },
  }),
);
