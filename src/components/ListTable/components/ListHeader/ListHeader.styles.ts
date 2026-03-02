import { createStyles } from '@utils';

export const styles = createStyles(({ spacing }) => ({
  headerCell: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: `${spacing.lg} ${spacing.md}`,
  },
}));
