import { Stat } from './Stats.types';

export const STATS: Stat[] = [
  { id: 'total', label: 'priceMatcher.stats.totalItems', tone: 'neutral' },
  { id: 'used', label: 'priceMatcher.stats.used', tone: 'info' },
  { id: 'left', label: 'priceMatcher.stats.left', tone: 'success' },
  {
    id: 'calculations',
    label: 'priceMatcher.stats.calculations',
    tone: 'neutral',
  },
  {
    id: 'failedCalculation',
    label: 'priceMatcher.stats.failedCalculation',
    tone: 'danger',
    zeroTone: 'muted',
  },
];
