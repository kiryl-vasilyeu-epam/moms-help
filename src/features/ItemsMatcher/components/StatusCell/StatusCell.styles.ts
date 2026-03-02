import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ colors, fontSizes }) => ({
  matchStatus: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  noMatch: {
    color: colors.matchNone,
    fontWeight: 'bold',
    fontSize: fontSizes.xl,
  },
  match: {
    color: colors.matchExact,
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
  },
  fuzzyMatch: {
    color: colors.matchFuzzy,
    fontWeight: 'bold',
    fontSize: fontSizes.xl,
  },
  manualMatch: {
    color: colors.matchManual,
    fontWeight: 'bold',
    fontSize: fontSizes.xl,
  },
}));
