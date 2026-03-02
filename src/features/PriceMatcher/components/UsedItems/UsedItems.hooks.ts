import { useMemo } from 'react';
import type {
  Calculation,
  PriceItem,
  AllUsedItems,
} from '@features/PriceMatcher/PriceMatcher.types';

export const useUsedItems = (
  usageHistory: Calculation[],
  items: PriceItem[],
): AllUsedItems => {
  return useMemo<AllUsedItems>(() => {
    const used: AllUsedItems = {};

    usageHistory.forEach((historyItem) => {
      if (historyItem.solution && historyItem.solution.length > 0) {
        historyItem.solution.forEach((item) => {
          if (!item || typeof item !== 'object' || !item.name) return;
          if (!used[item.name]) {
            const foundItem = items.find((i) => i?.name === item.name);
            used[item.name] = {
              name: item.name,
              rowNumber: foundItem?.rowNumber ?? '-',
              quantity: 0,
              salePriceCents: item.salePriceCents,
            };
          }
          used[item.name].quantity += item.quantity;
        });
      }
    });

    return used;
  }, [usageHistory, items]);
};
