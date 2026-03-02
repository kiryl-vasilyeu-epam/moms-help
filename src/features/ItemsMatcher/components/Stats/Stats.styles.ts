import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ spacing }) => ({
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: spacing.base,
    marginBottom: spacing.lg,
  },
}));
