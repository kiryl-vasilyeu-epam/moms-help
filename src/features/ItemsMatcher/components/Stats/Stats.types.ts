import { Stats1 } from '../../ItemsMatcher.types';

export interface Stat {
  id: keyof Stats1;
  label: string;
}

export interface StatsProps {
  stats: Stats1;
  statsConfig: Stat[];
}
