import { RowComponentProps } from "react-window";
import { RowComponentInnerProps } from "./RowComponent.types";
import { ListRow } from "../ListRow";
import { ListCell } from "../ListCell";

export const RowComponent = <TItem, TProps>({
  items,
  CellComponent,
  index,
  columnIds,
  itemHeight,
  columnsWeight,
  cellCommonProps,
  getRowStyles
}: RowComponentProps<RowComponentInnerProps<TItem, TProps>>) => {
  const item = items[index];
  const rowStyle = getRowStyles?.(item);

  return (
    <ListRow
      height={itemHeight}
      style={rowStyle}
    >
      {columnIds.map((columnId, cellIndex) => (
        <ListCell
          width={columnsWeight[cellIndex]}
          key={columnId}
          index={cellIndex}
        >
          <CellComponent
            item={item}
            columnId={columnId}
            rowIndex={index}
            cellCommonProps={cellCommonProps ?? {} as TProps}
          />
        </ListCell>
      ))}
    </ListRow>
  );
};