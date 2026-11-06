import { Stat } from './Stats.types';

export const STATS: Stat[] = [
  { id: 'total', label: 'itemsMatcher.stats.totalItems', tone: 'neutral' },
  { id: 'exact', label: 'itemsMatcher.stats.matchedItems', tone: 'success' },
  { id: 'fuzzy', label: 'itemsMatcher.stats.fuzzyItems', tone: 'warning' },
  { id: 'manual', label: 'itemsMatcher.stats.manualItems', tone: 'info' },
  {
    id: 'none',
    label: 'itemsMatcher.stats.unmatchedItems',
    tone: 'danger',
    zeroTone: 'muted',
  },
];
