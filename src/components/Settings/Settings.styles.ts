import { createStyles } from '@utils';

export const styles = createStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: spacing.xl,
    padding: spacing.base,
  },
}));
