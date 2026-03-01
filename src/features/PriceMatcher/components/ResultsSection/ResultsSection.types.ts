import type { Calculation, PriceItem } from '../../PriceMatcher.types';

export interface ResultsSectionProps {
  usageHistory: Calculation[];
  items: PriceItem[];
  onRemoveCalculation: (index: number) => void;
  onExportRemainingItems: () => void;
  onExportCalculations: () => void;
}
