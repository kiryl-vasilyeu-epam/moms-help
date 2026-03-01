import { TableCellProps } from './TableCell.types';
import { CELL_SPECIFIC_STYLES, COLUMN_RENDERS } from './TableCell.constants';
import { memo } from 'react';
import { styles } from './TableCell.styles';

export const TableCell = memo((props: TableCellProps) => {
  const { columnId } = props;
  const CellComponent = COLUMN_RENDERS[columnId];
  const cellStyle = CELL_SPECIFIC_STYLES[columnId];

  return (
    <div css={[styles.container, cellStyle]}>
      <CellComponent {...props} />
    </div>
  );
});

TableCell.displayName = 'TableCell';
