import { RowComponentInnerProps } from './RowComponent';

export interface ListTableProps<TItem, TProps extends unknown, C> extends RowComponentInnerProps<TItem, TProps, C> {
  headerLabels: string[];
}
