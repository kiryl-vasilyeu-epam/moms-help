import {
  ItemsMatcherData,
  MatchedItem,
} from '@features/ItemsMatcher/ItemsMatcher.types';
import { Columns } from '../ItemsTable/ItemsTable.types';
export interface TableCellProps {
  item: MatchedItem;
  rowIndex: number;
  columnId: Columns;
  cellCommonProps?: Pick<
    ItemsMatcherData,
    'handleRemoveMatch' | 'handleSelectMatchItem'
  >;
}
