import { TableCellProps } from './TableCell.types';
import { getCellSpecificStyles, COLUMN_RENDERS } from './TableCell.constants';
import { memo } from 'react';
import { stylesheet } from './TableCell.styles';
import { useStyles } from '@hooks';

export const TableCell = memo((props: TableCellProps) => {
  const { columnId } = props;
  const CellComponent = COLUMN_RENDERS[columnId];
  const styles = useStyles(stylesheet);
  const cellSpecificStyles = getCellSpecificStyles(styles);
  const cellStyle = cellSpecificStyles[columnId];

  return (
    <div css={[styles.container, cellStyle]}>
      <CellComponent {...props} />
    </div>
  );
});

TableCell.displayName = 'TableCell';
