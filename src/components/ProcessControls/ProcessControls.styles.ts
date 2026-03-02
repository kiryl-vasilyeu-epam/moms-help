import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ spacing }) => ({
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
