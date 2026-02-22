import { Stats } from "./ItemsMatcher.types"

export const STATS: { id: Stats, label: string }[] = [
  {id: 'total', label: 'itemMatcher.totalItems'},
  {id: 'exact', label: 'itemMatcher.matchedItems'},
  {id: 'fuzzy', label: 'itemMatcher.fuzzyItems'},
  {id: 'manual', label: 'itemMatcher.manualItems'},
  {id: 'unmatched', label: 'itemMatcher.unmatchedItems'}
];

export const FILTERS: { id: string, label: string }[] = [
  {id: 'all', label: 'itemMatcher.filterAll'},
  {id: 'exact', label: 'itemMatcher.filterExact'},
  {id: 'fuzzy', label: 'itemMatcher.filterFuzzy'},
  {id: 'manual', label: 'itemMatcher.filterManual'},
  {id: 'unmatched', label: 'itemMatcher.filterUnmatched'}
];