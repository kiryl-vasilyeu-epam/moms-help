import { createStyles } from '@utils';

export const styles = createStyles(({ spacing, fontSizes, colors }) => ({
  settingRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.base} 0`,
    borderBottom: `1px solid ${colors.borderMuted}`,
    gap: spacing.base,
  },
  settingLabel: {
    fontSize: fontSizes.lg,
  },
}));
