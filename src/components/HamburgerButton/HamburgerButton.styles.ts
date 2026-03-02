import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ colors, radii, transitions, spacing }) => ({
    toggle: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.xxs,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: colors.alwaysWhite,
      padding: 15,
    },

    toggleSpan: {
      width: '24px',
      height: '2px',
      background: colors.alwaysWhite,
      borderRadius: radii.sm,
      transition: `all ${transitions.base} ease`,
    },

    toggleSpan1Collapsed: {
      transform: 'rotate(45deg) translate(8px, 8px)',
    },

    toggleSpan2Collapsed: {
      opacity: 0,
    },

    toggleSpan3Collapsed: {
      transform: 'rotate(-45deg) translate(7px, -7px)',
    },
  }),
);
