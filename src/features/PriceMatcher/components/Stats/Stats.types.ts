import type { StatsBoxTone } from '@components';
import { Stats } from '../../PriceMatcher.types';

export interface Stat {
  id: keyof Stats;
  label: string;
  tone: StatsBoxTone;
  // Tone used when the value is zero (e.g. no failed calculations is not alarming)
  zeroTone?: StatsBoxTone;
}

export interface StatsProps {
  stats: Stats;
}
