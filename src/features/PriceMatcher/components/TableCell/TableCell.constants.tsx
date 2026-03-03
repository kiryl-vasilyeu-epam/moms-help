import { ReactNode } from 'react';
import { TableCellProps } from './TableCell.types';
import { Columns } from '../../PriceMatcher.types';
import type { StrictCssObjectWithSelectors } from '@utils';

interface TableCellStyles {
  numberCell: StrictCssObjectWithSelectors;
  usedCell: StrictCssObjectWithSelectors;
  leftCell: StrictCssObjectWithSelectors;
}

export const getCellSpecificStyles = (
  styles: TableCellStyles,
): Partial<Record<Columns, StrictCssObjectWithSelectors>> => ({
  index: styles.numberCell,
  usedAmount: styles.usedCell,
  leftAmount: styles.leftCell,
});

export const COLUMN_RENDERS: Record<
  Columns,
  (props: TableCellProps) => ReactNode
> = {
  index: ({ item: { rowNumber } }) => rowNumber,
  name: ({ item: { name } }) => name,
  price: ({ item: { priceCents } }) => (priceCents / 100).toFixed(2),
  discountPrice: ({ item: { salePriceCents } }) =>
    (salePriceCents / 100).toFixed(2),
  amount: ({ item: { amount } }) => amount,
  usedAmount: ({ item: { usedAmount } }) => usedAmount,
  leftAmount: ({ item: { remainingAmount } }) => remainingAmount,
};
