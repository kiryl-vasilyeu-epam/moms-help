import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ spacing, fontSizes, colors, radii, sizes, transitions }) => ({
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
    toggle: {
      position: 'relative',
      width: sizes.toggleWidth,
      height: sizes.toggleHeight,
      borderRadius: radii.xl,
      background: 'rgba(255, 255, 255, 0.2)',
      cursor: 'pointer',
      transition: `background ${transitions.fast}`,
    },
    toggleActive: {
      background: colors.gradient,
    },
    toggleKnob: {
      position: 'absolute',
      top: '3px',
      left: '3px',
      width: sizes.toggleKnob,
      height: sizes.toggleKnob,
      borderRadius: radii.round,
      background: colors.white,
      transition: `transform ${transitions.fast}`,
    },
    toggleKnobActive: {
      transform: 'translateX(22px)',
    },
  }),
);
