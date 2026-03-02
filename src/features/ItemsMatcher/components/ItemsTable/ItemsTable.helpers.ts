import type { StrictCssObjectWithSelectors } from '@utils';
import { MatchedItem } from '../../ItemsMatcher.types';
import { MatchType } from '../../ItemsMatcher.types';

interface ItemsTableStyles {
  rowFuzzy: StrictCssObjectWithSelectors;
  rowManual: StrictCssObjectWithSelectors;
  rowUnmatched: StrictCssObjectWithSelectors;
}

const getRowSpecificStyles = (
  styles: ItemsTableStyles,
): Record<MatchType, StrictCssObjectWithSelectors | null> => ({
  fuzzy: styles.rowFuzzy,
  manual: styles.rowManual,
  none: styles.rowUnmatched,
  exact: null,
});

export const createGetRowStyles =
  (styles: ItemsTableStyles) => (item: MatchedItem) =>
    getRowSpecificStyles(styles)[item.matchType];
