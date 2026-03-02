import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ spacing, fontSizes, colors }) => ({
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
  }),
);
