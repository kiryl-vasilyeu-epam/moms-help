import { createStyles } from '@utils';

export const styles = createStyles(({ colors }) => ({
  rowFuzzy: {
    borderTop: `3px solid ${colors.matchFuzzy}`,
    borderBottom: `3px solid ${colors.matchFuzzy}`,
  },
  rowManual: {
    borderTop: `3px solid ${colors.matchManual}`,
    borderBottom: `3px solid ${colors.matchManual}`,
  },
  rowUnmatched: {
    borderTop: `3px solid ${colors.matchNone}`,
    borderBottom: `3px solid ${colors.matchNone}`,
  },
}));
