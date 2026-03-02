import { createStyles } from '@utils';

export const styles = createStyles(
  ({ colors, fontSizes, spacing, transitions }) => ({
    collapsedText: {
      opacity: 0,
    },

    menuItem: {
      padding: `${spacing.lg} ${spacing.xxl}`,
      border: 'none',
      background: 'transparent',
      color: colors.sidebarText,
      cursor: 'pointer',
      fontSize: fontSizes.base,
      fontWeight: 500,
      textAlign: 'left',
      transition: `all ${transitions.base}`,
      borderLeft: '5px solid transparent',
      display: 'flex',
      alignItems: 'center',
      gap: spacing.base,
      '&:hover': {
        background: colors.sidebarHover,
        color: colors.white,
      },
    },

    menuIcon: {
      fontSize: fontSizes.lg,
      flexShrink: 0,
    },

    menuItemActive: {
      background: colors.sidebarActive,
      color: colors.white,
      borderLeftColor: colors.sidebarActiveBorder,
    },

    menuText: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }),
);
