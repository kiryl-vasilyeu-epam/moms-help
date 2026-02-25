import { RowComponentInnerProps } from './components';

export interface ListTableProps<TItem, TProps extends unknown, C> extends RowComponentInnerProps<TItem, TProps, C> {
  headerLabels: string[];
}
