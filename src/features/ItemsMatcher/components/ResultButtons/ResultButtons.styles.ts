import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ spacing }) => ({
  buttonRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginLeft: 'auto',
  },
  button: {
    padding: `${spacing.sm} ${spacing.lg}`,
  },
}));
