import type { Calculation, PriceItem } from '../../PriceMatcher.types';

export interface ResultsSectionProps {
  usageHistory: Calculation[];
  items: PriceItem[];
  onRemoveCalculation: (index: number) => void;
  centsToStr: (cents: number) => string;
  onExportRemainingItems?: () => void;
  onExportCalculations?: () => void;
}
