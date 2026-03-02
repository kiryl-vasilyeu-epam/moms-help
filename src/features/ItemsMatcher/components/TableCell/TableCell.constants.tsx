import { ReactNode } from 'react';
import { TableCellProps } from './TableCell.types';
import { StatusCell } from '../StatusCell';
import { Columns } from '../ItemsTable/ItemsTable.types';
import type { StrictCssObjectWithSelectors } from '@utils';
import { InvNoFusionCell } from './InvNoFusionCell';

interface TableCellStyles {
  tooltip: StrictCssObjectWithSelectors;
}

export const createColumnRenders = (
  styles: TableCellStyles,
): Record<Columns, (props: TableCellProps) => ReactNode> => ({
  index: ({ rowIndex }) => rowIndex + 1,
  invNo: ({ item: { invNo } }) => invNo,
  name: ({ item: { name } }) => name,
  amount: ({ item: { totalAmount } }) => Math.round(totalAmount),
  lastPrice: ({ item: { latestPrice } }) => latestPrice.toFixed(2),
  invNoFusion: (props: TableCellProps) => (
    <InvNoFusionCell {...props} tooltipStyle={styles.tooltip} />
  ),
  status: StatusCell,
});
