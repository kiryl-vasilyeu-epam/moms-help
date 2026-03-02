import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ spacing, radii, colors }) => ({
  matchedInvNo: {
    cursor: 'default',
    position: 'relative',
  },
  matchedInvNoFuzzy: {
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderRadius: radii.base,
    border: `2px solid ${colors.warningDark}`,
    background: colors.warningLight,
    '&:hover': {
      background: colors.warningLightHover,
    },
    cursor: 'pointer',
  },
  matchedInvNoNone: {
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderRadius: radii.base,
    border: `2px dashed ${colors.primary}`,
    '&:hover': {
      background: '#f0f4ff',
    },
    cursor: 'pointer',
  },
}));
