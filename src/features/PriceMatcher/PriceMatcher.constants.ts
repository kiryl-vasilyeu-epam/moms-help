import { Columns } from './PriceMatcher.types';

export const COLUMNS: { id: Columns; weight: number }[] = [
  { id: 'index', weight: 1 },
  { id: 'name', weight: 6 },
  { id: 'price', weight: 1 },
  { id: 'discountPrice', weight: 1 },
  { id: 'amount', weight: 1 },
  { id: 'usedAmount', weight: 1.5 },
  { id: 'leftAmount', weight: 1 },
];
export const COLUMNS_IDS = COLUMNS.map(({ id }) => id);
export const COLUMNS_WEIGHT = COLUMNS.map(({ weight }) => weight);
