import { createStyles } from '@utils';

export const styles = createStyles(({ spacing }) => ({
  buttonRow: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: spacing.sm,
  },
  processButton: {
    flex: 1,
  },
}));
