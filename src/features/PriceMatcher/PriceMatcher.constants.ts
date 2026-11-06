import { Columns } from './PriceMatcher.types';

export const COLUMNS: { id: Columns; weight: number; labelKey: string }[] = [
  { id: 'index', weight: 1, labelKey: 'priceMatcher.tableHeaders.number' },
  { id: 'name', weight: 6, labelKey: 'priceMatcher.tableHeaders.name' },
  { id: 'price', weight: 1, labelKey: 'priceMatcher.tableHeaders.price' },
  {
    id: 'discountPrice',
    weight: 1,
    labelKey: 'priceMatcher.tableHeaders.discountPrice',
  },
  { id: 'amount', weight: 1, labelKey: 'priceMatcher.tableHeaders.quantity' },
  {
    id: 'usedAmount',
    weight: 1.5,
    labelKey: 'priceMatcher.tableHeaders.used',
  },
  {
    id: 'leftAmount',
    weight: 1,
    labelKey: 'priceMatcher.tableHeaders.remaining',
  },
];
