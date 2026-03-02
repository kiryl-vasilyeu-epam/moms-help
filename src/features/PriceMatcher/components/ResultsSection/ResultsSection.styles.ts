import { createSxStyles } from '@utils';

export const styles = createSxStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  },
}));
