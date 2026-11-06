import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ spacing, fontSizes, colors, radii }) => ({
    section: {
      display: 'flex',
      flexDirection: 'column',
      background: colors.backgroundAlt,
      border: `1px solid ${colors.border}`,
      borderRadius: radii.lg,
      padding: `${spacing.base} ${spacing.lg}`,
      '& > div:last-of-type': {
        borderBottom: 'none',
      },
    },
    sectionTitle: {
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
      margin: 0,
      paddingBottom: spacing.sm,
      borderBottom: `2px solid ${colors.primary}`,
      alignSelf: 'flex-start',
    },
  }),
);
