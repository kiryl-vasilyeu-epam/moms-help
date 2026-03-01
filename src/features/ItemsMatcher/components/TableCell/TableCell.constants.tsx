import { Tooltip } from '@mui/material';
import { styles } from './TableCell.styles';
import { ReactNode } from 'react';
import { TableCellProps } from './TableCell.types';
import { MatchCell } from '../MatchCell';
import { StatusCell } from '../StatusCell';
import { Columns } from '../ItemsTable/ItemsTable.types';

export const ROW_SPECIFIC_STYLES = {
  fuzzy: styles.rowFuzzy,
  manual: styles.rowManual,
  none: styles.rowUnmatched,
  exact: null,
};

export const COLUMN_RENDERS: Record<
  Columns,
  (props: TableCellProps) => ReactNode
> = {
  index: ({ rowIndex }) => rowIndex + 1,
  invNo: ({ item: { invNo } }) => invNo,
  name: ({ item: { name } }) => name,
  amount: ({ item: { totalAmount } }) => Math.round(totalAmount),
  lastPrice: ({ item: { latestPrice } }) => latestPrice.toFixed(2),
  invNoFusion: ({ item, rowIndex, cellCommonProps }: TableCellProps) => (
    <Tooltip
      title={
        item.matchedItem?.rawData && (
          <div css={styles.tooltip}>{item.matchedItem?.rawData}</div>
        )
      }
      enterNextDelay={800}
      arrow
    >
      <MatchCell
        item={item}
        index={rowIndex}
        cellCommonProps={cellCommonProps}
      />
    </Tooltip>
  ),
  status: StatusCell,
};
