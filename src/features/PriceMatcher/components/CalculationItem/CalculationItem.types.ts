import type { Calculation } from '@features/PriceMatcher/PriceMatcher.types';

export interface CalculationsItemProps {
  calculation: Calculation;
  index: number;
  handleCopyCalculation: (index: number) => void;
  handleRemoveCalculation: (index: number) => () => void;
}
