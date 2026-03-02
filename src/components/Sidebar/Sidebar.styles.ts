import { createStyles } from '@utils';

export const styles = createStyles(
  ({ sizes, colors, spacing, fontSizes, shadows, transitions, zIndices }) => ({
    sidebar: {
      position: 'absolute',
      left: 0,
      zIndex: zIndices.sidebar,
      width: sizes.sidebarExpandedWidth,
      height: '100vh',
      background: colors.sidebarGradient,
      color: colors.white,
      overflowY: 'auto',
      boxShadow: shadows.sidebar,
      transition: `width ${transitions.base} ease`,
    },
    collapsedSidebar: {
      width: sizes.sidebarWidth,
    },

    header: {
      padding: `0 ${spacing.base}`,
      borderBottom: `2px solid ${colors.sidebarBorder}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: sizes.headerHeight,
    },

    headerTitle: {
      fontSize: fontSizes.xxl,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    collapsedText: {
      opacity: 0,
    },

    menu: {
      padding: `${spacing.sm} 0`,
      gap: 10,
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);
