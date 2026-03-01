import { Stat } from './Stats.types';

export const STATS: Stat[] = [
  { id: 'total', label: 'itemsMatcher.stats.totalItems' },
  { id: 'exact', label: 'itemsMatcher.stats.matchedItems' },
  { id: 'fuzzy', label: 'itemsMatcher.stats.fuzzyItems' },
  { id: 'manual', label: 'itemsMatcher.stats.manualItems' },
  { id: 'none', label: 'itemsMatcher.stats.unmatchedItems' },
];
