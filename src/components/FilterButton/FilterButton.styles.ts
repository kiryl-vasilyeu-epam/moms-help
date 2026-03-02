import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ colors, radii, fontSizes, transitions }) => ({
    filterBtn: {
      padding: '10px 20px',
      border: `2px solid ${colors.primary}`,
      background: colors.white,
      color: colors.primary,
      borderRadius: radii.md,
      cursor: 'pointer',
      fontSize: fontSizes.sm,
      fontWeight: 600,
      transition: `all ${transitions.base}`,
      '&:hover': {
        background: colors.backgroundBlueHover,
      },
    },

    activeButton: {
      background: colors.primary,
      color: colors.white,
      '&:hover': {
        background: colors.primary,
      },
    },
  }),
);
