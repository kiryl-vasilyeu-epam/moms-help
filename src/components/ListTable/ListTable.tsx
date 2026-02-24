import { styles } from "./ListTable.styles";
import type { ListTableProps } from "./ListTable.types";
import { List } from "react-window";
import { RowComponent } from "./RowComponent";
import { ListHeader } from "./ListHeader";


export const ListTable = <T extends object, P extends unknown, C extends unknown>({
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
      <ListHeader
        headerLabels={headerLabels}
        columnsWeight={columnsWeight}
      />
      <List
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
