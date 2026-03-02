import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ spacing }) => ({
  buttonRow: {
    alignSelf: 'center',
    display: 'flex',
    gap: spacing.sm,
  },
}));
