import { TableCellProps } from './TableCell.types';
import { createColumnRenders } from './TableCell.constants';
import { memo, useMemo } from 'react';
import { stylesheet } from './TableCell.styles';
import { useStyles } from '@hooks';

export const TableCell = memo((props: TableCellProps) => {
  const { columnId } = props;
  const styles = useStyles(stylesheet);
  const columnRenders = useMemo(() => createColumnRenders(styles), [styles]);
  const CellComponent = columnRenders[columnId];

  return (
    <div css={styles.container}>
      <CellComponent {...props} />
    </div>
  );
});

TableCell.displayName = 'TableCell';
