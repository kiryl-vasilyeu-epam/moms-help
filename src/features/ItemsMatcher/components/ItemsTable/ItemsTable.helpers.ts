import { ROW_SPECIFIC_STYLES } from "./ItemsTable.constants";
import { MatchedItem } from "../../ItemsMatcher.types";

export const getRowStyles = (item: MatchedItem) => {
  console.log('item');
  return ROW_SPECIFIC_STYLES[item.matchType];
};