import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ colors, radii, spacing, fontSizes }) => ({
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
    flatBox: {
      background: colors.white,
      border: `1px solid ${colors.border}`,
      borderTopWidth: '4px',
      borderRadius: radii.lg,
      textAlign: 'left',
      justifyContent: 'space-between',
      gap: spacing.xxs,
      padding: `${spacing.md} ${spacing.base}`,
    },
    flatLabel: {
      fontSize: fontSizes.sm,
      fontWeight: 'normal',
      color: colors.textMuted,
      opacity: 1,
    },
    flatAmount: {
      fontSize: fontSizes.xxl,
    },
    neutral: { borderTopColor: colors.primary, color: colors.text },
    info: { borderTopColor: colors.info, color: colors.info },
    success: { borderTopColor: colors.success, color: colors.success },
    warning: { borderTopColor: colors.warning, color: colors.warning },
    danger: { borderTopColor: colors.danger, color: colors.danger },
    muted: { borderTopColor: colors.border, color: colors.textMuted },
  }),
);
