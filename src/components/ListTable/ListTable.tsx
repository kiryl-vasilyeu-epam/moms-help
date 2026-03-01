import { styles } from './ListTable.styles';
import type { ListTableProps } from './ListTable.types';
import { List } from 'react-window';
import { RowComponent, ListHeader } from './components';

export const ListTable = <
  T extends object,
  P extends unknown,
  C extends string,
>({
  itemHeight,
  headerLabels,
  items,
  CellComponent,
  columnIds,
  columnsWeight,
  cellCommonProps,
  getRowStyles,
}: ListTableProps<T, P, C>) => {
  return (
    <div css={styles.container}>
      <ListHeader headerLabels={headerLabels} columnsWeight={columnsWeight} />
      <List
        key={items.length}
        rowComponent={RowComponent}
        rowCount={items.length}
        rowHeight={itemHeight ?? 80}
        rowProps={{
          items,
          CellComponent,
          columnIds,
          itemHeight,
          columnsWeight,
          cellCommonProps,
          getRowStyles,
        }}
      />
    </div>
  );
};
