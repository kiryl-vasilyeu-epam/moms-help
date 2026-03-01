import { Columns, PriceItem } from '../../PriceMatcher.types';
export interface TableCellProps {
  item: PriceItem;
  rowIndex: number;
  columnId: Columns;
}
