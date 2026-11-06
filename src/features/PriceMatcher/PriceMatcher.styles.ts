import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ spacing, colors, radii }) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  },
  toolbar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.lg,
    borderRadius: radii.lg,
    border: `1px solid ${colors.border}`,
    background: colors.backgroundAlt,
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
