import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ spacing }) => ({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: spacing.xl,
    padding: spacing.base,
  },
}));
