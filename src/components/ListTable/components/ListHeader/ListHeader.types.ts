import { ListTableProps } from '../../ListTable.types';

export type ListHeaderProps<T, P, C> = Pick<
  ListTableProps<T, P, C>,
  'headerLabels' | 'columnsWeight'
>;
