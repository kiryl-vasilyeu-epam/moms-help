import { Stats } from '../../PriceMatcher.types';

export interface Stat {
  id: keyof Stats;
  label: string;
}

export interface StatsProps {
  stats: Stats;
}
