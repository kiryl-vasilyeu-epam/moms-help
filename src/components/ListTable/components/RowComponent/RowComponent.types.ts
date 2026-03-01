import { StrictCssObjectWithSelectors } from '@utils';
import { ComponentType } from 'react';

export interface CellComponentProps<TItem, TProps, TColumn> {
  item: TItem;
  columnId: TColumn;
  rowIndex: number;
  cellCommonProps: TProps;
}

export interface RowComponentInnerProps<TItem, TProps, TColumn> {
  items: TItem[];
  CellComponent: ComponentType<CellComponentProps<TItem, TProps, TColumn>>;
  columnIds: TColumn[];
  itemHeight?: number;
  columnsWeight: number[];
  cellCommonProps?: TProps;
  getRowStyles?: (item: TItem) => StrictCssObjectWithSelectors | null;
}
