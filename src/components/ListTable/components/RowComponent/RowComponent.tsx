import { RowComponentProps } from "react-window";
import { RowComponentInnerProps } from "./RowComponent.types";
import { ListRow } from "../ListRow";
import { ListCell } from "../ListCell";
import { StrictCssObjectWithSelectors } from "@utils";

export const RowComponent = <TItem, TProps, TColumns extends string>({
  items,
  CellComponent,
  index,
  columnIds,
  itemHeight,
  columnsWeight,
  cellCommonProps,
  getRowStyles,
  style,
}: RowComponentProps<RowComponentInnerProps<TItem, TProps, TColumns>>) => {
  const item = items[index];
  const rowStyle = getRowStyles?.(item);

  return (
    <ListRow
      height={itemHeight}
      style={[style as StrictCssObjectWithSelectors, rowStyle]}
      even={index % 2}
    >
      {columnIds.map((columnId, cellIndex) => (
        <ListCell
          key={columnId}
          width={columnsWeight[cellIndex]}
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