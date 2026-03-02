import { createStyles } from '@utils';

export const styles = createStyles(({ colors, radii, spacing, fontSizes }) => ({
  statBox: {
    flex: 1,
    background: colors.gradient,
    color: colors.white,
    borderRadius: radii.base,
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
    padding: spacing.lg,
  },
  statBoxLabel: {
    fontSize: fontSizes.sm,
    opacity: 0.9,
  },
  statBoxAmount: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
  },
}));
