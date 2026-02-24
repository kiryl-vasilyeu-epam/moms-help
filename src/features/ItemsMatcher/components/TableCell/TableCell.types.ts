import { MatchedItem } from "@features/ItemsMatcher/ItemsMatcher.types";
import { Columns } from "../ItemsTable/ItemsTable.types";


export interface TableCellProps {
  item: MatchedItem;
  rowIndex: number;
  columnId: Columns;
}
