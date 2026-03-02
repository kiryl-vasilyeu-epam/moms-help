import { createStyles } from '@utils';

export const styles = createStyles(
  ({ spacing, fontSizes, colors, radii, sizes, transitions }) => ({
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
