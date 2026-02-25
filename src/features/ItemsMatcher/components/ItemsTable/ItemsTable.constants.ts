import { styles } from "./ItemsTable.styles";
import { Columns } from "./ItemsTable.types";

export const TABLE_HEADER = [
  'itemsMatcher.tableHeaders.number',
  'itemsMatcher.tableHeaders.article1c',
  'itemsMatcher.tableHeaders.name',
  'itemsMatcher.tableHeaders.quantity',
  'itemsMatcher.tableHeaders.price',
  'itemsMatcher.tableHeaders.articleFusion',
  'itemsMatcher.tableHeaders.status',
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