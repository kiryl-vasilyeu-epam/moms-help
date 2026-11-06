import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ spacing, fontSizes }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: spacing.md,
  },
  processButton: {
    width: '100%',
    minHeight: '56px',
    fontSize: fontSizes.lg,
  },
  secondaryRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: spacing.md,
  },
}));
