import { ListTableProps } from "../ListTable.types";

export type ListHeaderProps<T> = Pick<ListTableProps<T>, 'headerLabels' | 'columnsWeight'>
