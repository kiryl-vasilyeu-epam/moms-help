import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ spacing, colors }) => ({
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
    color: colors.info,
    fontWeight: 'bold',
  },
  leftCell: {
    color: colors.success,
    fontWeight: 'bold',
  },
}));
