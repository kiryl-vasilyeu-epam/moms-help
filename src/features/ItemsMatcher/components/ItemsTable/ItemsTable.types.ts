import { MatchedItem } from "../../ItemsMatcher.types";

export type Columns = 'index' | 'invNo' | 'name' | 'amount' | 'lastPrice' | 'invNoFusion' | 'status';

export interface ItemsMatcherTableProps {
  items: MatchedItem[];
  filterApplied: boolean;
}
