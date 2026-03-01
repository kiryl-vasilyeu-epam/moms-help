import { ROW_SPECIFIC_STYLES } from './ItemsTable.constants';
import { MatchedItem } from '../../ItemsMatcher.types';

export const getRowStyles = (item: MatchedItem) =>
  ROW_SPECIFIC_STYLES[item.matchType];
