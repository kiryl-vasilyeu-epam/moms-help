import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ spacing }) => ({
  results: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
}));
