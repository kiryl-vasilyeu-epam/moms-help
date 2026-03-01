import { ItemsMatcherData } from '../../ItemsMatcher.types';

export type Columns =
  | 'index'
  | 'invNo'
  | 'name'
  | 'amount'
  | 'lastPrice'
  | 'invNoFusion'
  | 'status';

export type ItemsMatcherTableProps = Pick<
  ItemsMatcherData,
  | 'filteredItems'
  | 'filterApplied'
  | 'handleRemoveMatch'
  | 'handleSelectMatchItem'
>;
