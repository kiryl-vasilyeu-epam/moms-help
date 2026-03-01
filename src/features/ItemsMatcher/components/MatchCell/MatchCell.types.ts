import type { TableCellProps } from '../TableCell/TableCell.types';

export type MatchCellProps = Pick<
  TableCellProps,
  'item' | 'cellCommonProps'
> & {
  index: number;
};
