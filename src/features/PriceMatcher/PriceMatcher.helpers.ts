import { PriceItem } from './PriceMatcher.types';

export const parseMoneyToCents = (moneyStr: string): number => {
  if (!moneyStr || typeof moneyStr !== 'string') return 0;
  let cleaned = moneyStr.trim().replace(/\s/g, '');

  const commaCount = (cleaned.match(/,/g) ?? []).length;
  const dotCount = (cleaned.match(/\./g) ?? []).length;

  if (
    dotCount > 1 ||
    (dotCount === 1 &&
      commaCount === 1 &&
      cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.'))
  ) {
    cleaned = cleaned.replace(/\./g, '').replace(',', '.');
  } else if (commaCount > 1 || (commaCount === 1 && dotCount === 0)) {
    cleaned = cleaned.replace(/,/g, '.');
  }

  const num = parseFloat(cleaned);
  if (Number.isNaN(num)) return 0;

  return Math.round(num * 100);
};

export const parseFile = (
  rows: unknown[][],
  {
    discountPercent,
    firstRow,
    nameColumn,
    priceColumn,
    amountColumn,
  }: {
    discountPercent: number;
    firstRow: number;
    nameColumn: number;
    priceColumn: number;
    amountColumn: number;
  },
): PriceItem[] => {
  return rows
    .slice(firstRow)
    .map((row, index) => {
      const name = String(row[nameColumn] ?? '').trim();
      const priceCents = parseMoneyToCents(String(row[priceColumn] ?? ''));
      const salePriceCents =
        priceCents - Math.round((priceCents * discountPercent) / 100);
      const amount = Math.max(
        0,
        parseInt(String(row[amountColumn] ?? '0'), 10) || 0,
      );

      return {
        rowNumber: index + firstRow + 1,
        name,
        priceCents,
        salePriceCents,
        amount,
        originalAmount: amount,
        remainingAmount: amount,
        usedAmount: 0,
      };
    })
    .filter((item) => item.name && item.amount > 0);
};
