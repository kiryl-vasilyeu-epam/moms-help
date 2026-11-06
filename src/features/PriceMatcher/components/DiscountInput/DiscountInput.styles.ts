import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ spacing }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: spacing.xxs,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  input: {
    width: '110px',
  },
}));
