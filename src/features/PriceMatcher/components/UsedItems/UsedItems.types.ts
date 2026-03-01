import type { AllUsedItems } from '@features/PriceMatcher/PriceMatcher.types';

export interface UsedItemsProps {
  allUsedItems: AllUsedItems;
  resultsOpen: boolean;
  handleCloseResults: () => void;
}
