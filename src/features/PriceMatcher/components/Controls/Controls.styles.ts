import { createSxStyles } from '@utils';

export const styles = createSxStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing.lg,
  },
  button: {
    width: 300,
  },
}));
