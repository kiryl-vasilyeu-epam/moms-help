import { createStyles } from '@utils';

export const styles = createStyles(({ spacing, colors }) => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    padding: `${spacing.lg} ${spacing.md}`,
    alignItems: 'center',
  },
  numberCell: {
    color: colors.cellNumber,
  },
  usedCell: {
    color: colors.cellUsed,
  },
  leftCell: {
    color: colors.cellLeft,
  },
}));
