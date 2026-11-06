import type { SumRowData, SumRowStatus } from '../PricesInput';

export interface SumRowProps {
  row: SumRowData;
  status: SumRowStatus;
  index: number;
  shouldFocus: boolean;
  onChange: (id: string, patch: Partial<SumRowData>) => void;
  onToggleApprox: (id: string) => void;
  onRemove: (id: string) => void;
  onEnter: (id: string) => void;
  onSubmit: () => void;
}
