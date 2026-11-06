import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ spacing, fontSizes, colors }) => ({
    settingRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${spacing.md} 0`,
      borderBottom: `1px solid ${colors.border}`,
      gap: spacing.base,
    },
    settingLabel: {
      fontSize: fontSizes.base,
    },
  }),
);
