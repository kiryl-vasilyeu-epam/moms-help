export type StatsBoxTone =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'muted';

export interface StatsBoxProps {
  label: string;
  amount: string | number;
  // Flat tiles look informational and are not confused with buttons
  flat?: boolean;
  tone?: StatsBoxTone;
}
