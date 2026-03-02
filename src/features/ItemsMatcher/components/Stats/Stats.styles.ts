import { createStyles } from '@utils';

export const styles = createStyles(({ spacing }) => ({
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: spacing.base,
    marginBottom: spacing.lg,
  },
}));
