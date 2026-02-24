import { Stat } from "./Stats.types";

export const STATS: Stat[] = [
  { id: 'total', label: 'itemMatcher.totalItems' },
  { id: 'exact', label: 'itemMatcher.matchedItems' },
  { id: 'fuzzy', label: 'itemMatcher.fuzzyItems' },
  { id: 'manual', label: 'itemMatcher.manualItems' },
  { id: 'none', label: 'itemMatcher.unmatchedItems' }
];