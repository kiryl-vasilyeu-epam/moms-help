import { styles } from "./ItemsTable.styles";
import { Columns } from "./ItemsTable.types";

export const TABLE_HEADER = [
  'itemMatcher.tableHeaders.number',
  'itemMatcher.tableHeaders.article1c',
  'itemMatcher.tableHeaders.name',
  'itemMatcher.tableHeaders.quantity',
  'itemMatcher.tableHeaders.price',
  'itemMatcher.tableHeaders.articleFusion',
  'itemMatcher.tableHeaders.status',
];

export const ROW_SPECIFIC_STYLES = {
  fuzzy: styles.rowFuzzy,
  manual: styles.rowManual,
  none: styles.rowUnmatched,
  exact: null,
};

export const COLUMNS: { id: Columns, weight: number }[] = [
  { id: 'index', weight: 1 },
  { id: 'invNo', weight: 3 },
  { id: 'name', weight: 5 },
  { id: 'amount', weight: 2 },
  { id: 'lastPrice', weight: 2 },
  { id: 'invNoFusion', weight: 3 },
  { id: 'status', weight: 2 },
];
export const COLUMNS_IDS = COLUMNS.map(({ id }) => id);
export const COLUMNS_WEIGHT = COLUMNS.map(({ weight }) => weight);