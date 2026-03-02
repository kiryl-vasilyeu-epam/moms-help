import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ spacing }) => ({
  headerCell: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: `${spacing.lg} ${spacing.md}`,
  },
}));
