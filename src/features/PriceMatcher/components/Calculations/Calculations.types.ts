import type {
  Calculation,
  PriceItem,
} from '@features/PriceMatcher/PriceMatcher.types';

export interface CalculationsProps {
  usageHistory: Calculation[];
  items: PriceItem[];
  onRemoveCalculation: (index: number) => void;
  calculationsOpen: boolean;
  handleCalculationClose: () => void;
}
