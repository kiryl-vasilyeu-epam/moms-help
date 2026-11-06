import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ colors, fontSizes, transitions }) => ({
    filterBtn: {
      padding: '8px 18px',
      border: `1px solid ${colors.border}`,
      background: colors.white,
      color: colors.text,
      borderRadius: '999px',
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
      borderColor: colors.primary,
      color: colors.alwaysWhite,
      '&:hover': {
        background: colors.primary,
      },
    },
  }),
);
