import { FilterType } from "@features/ItemsMatcher/ItemsMatcher.types";

export const FILTERS: { id: FilterType, label: string }[] = [
  {id: 'all', label: 'itemMatcher.filterAll'},
  {id: 'exact', label: 'itemMatcher.filterExact'},
  {id: 'fuzzy', label: 'itemMatcher.filterFuzzy'},
  {id: 'manual', label: 'itemMatcher.filterManual'},
  {id: 'none', label: 'itemMatcher.filterUnmatched'}
];
