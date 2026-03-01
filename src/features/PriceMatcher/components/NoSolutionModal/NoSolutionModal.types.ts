import type { FailedCalculation } from '../../PriceMatcher.types';

export interface NoSolutionModalProps {
  open: boolean;
  onClose: () => void;
  failedCalculations: FailedCalculation[];
}
