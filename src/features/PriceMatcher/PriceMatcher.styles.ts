import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ spacing }) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  },
  loadingTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.lg,
  },
  loadingDetails: {
    display: 'block',
    marginTop: spacing.sm,
  },
}));
