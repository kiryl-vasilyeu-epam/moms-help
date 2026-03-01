import { useCallback } from 'react';
import type {
  Calculation,
  PriceItem,
} from '@features/PriceMatcher/PriceMatcher.types';
import { centsToStr } from '@features/PriceMatcher/PriceMatcher.helpers';

export const useCalculations = (
  usageHistory: Calculation[],
  items: PriceItem[],
) => {
  const handleCopyCalculation = useCallback(
    (index: number) => {
      if (index < 0 || index >= usageHistory.length) return;

      const calculation = usageHistory[index];
      const targetCents = calculation.targetCents || 0;
      let textToCopy = `Расчет #${calculation.calculationNumber || index + 1}\n`;
      textToCopy += `Целевая сумма: ${centsToStr(targetCents)}\n\n`;

      if (!calculation.solution || calculation.solution.length === 0) {
        textToCopy += `Точная комбинация не найдена\n`;
        navigator.clipboard.writeText(textToCopy);
        return;
      }

      textToCopy += `Товары:\n`;
      calculation.solution.forEach((item) => {
        const rowNum =
          item.rowNumber ??
          items.find((i) => i.name === item.name)?.rowNumber ??
          '-';
        const itemTotalCents = (item.salePriceCents || 0) * item.quantity;
        textToCopy += `${item.quantity} шт. (строка ${rowNum}) ${item.name} | ${centsToStr(item.salePriceCents)} = ${centsToStr(itemTotalCents)}\n`;
      });

      const totalCents = calculation.calculatedCents ?? 0;
      textToCopy += `\nИтого: ${centsToStr(totalCents)}\n`;

      navigator.clipboard.writeText(textToCopy);
    },
    [usageHistory, items],
  );

  return { handleCopyCalculation };
};
