import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ colors, radii, sizes }) => ({
  row: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    borderBottom: `1px solid ${colors.border}`,
  },
  header: {
    background: colors.gradient,
    color: colors.white,
    fontWeight: 600,
    borderRadius: `${radii.lg} ${radii.lg} 0 0`,
    height: sizes.headerHeight,
  },
  even: {
    background: colors.backgroundEvenDark,
  },
}));
