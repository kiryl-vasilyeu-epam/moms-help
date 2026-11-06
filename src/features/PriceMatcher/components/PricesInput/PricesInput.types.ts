import type { ApplySumsPayload, Calculation } from '../../PriceMatcher.types';

export interface SumRowData {
  id: string;
  calculationKey?: string;
  amount: string;
  isApprox: boolean;
  minus: string;
  plus: string;
}

export type SumRowStatus =
  | { kind: 'new' }
  | { kind: 'changed' }
  | { kind: 'calculated'; calculation: Calculation };

export interface SumRowView {
  row: SumRowData;
  status: SumRowStatus;
}

export interface PricesInputProps {
  usageHistory: Calculation[];
  onApply: (payload: ApplySumsPayload) => void;
  onRemoveCalculation: (index: number) => void;
}
