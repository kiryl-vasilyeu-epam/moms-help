import { TableCellProps } from './TableCell.types';
import { COLUMN_RENDERS } from './TableCell.constants';
import { memo } from 'react';
import { styles } from './TableCell.styles';

export const TableCell = memo((props: TableCellProps) => {
  const { columnId } = props;
  const CellComponent = COLUMN_RENDERS[columnId];

  return (
    <div css={styles.container}>
      <CellComponent {...props} />
    </div>
  );
});

TableCell.displayName = 'TableCell';
