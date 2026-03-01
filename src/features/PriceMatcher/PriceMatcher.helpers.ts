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

export const parseFile = (rows: unknown[][]): PriceItem[] => {
  const headers = (rows[0] as unknown as unknown[]).map((h) => String(h));
  const nameIdx = headers.findIndex((h) =>
    String(h).toLowerCase().includes('наимено'),
  );
  const priceIdx = headers.findIndex((h) =>
    String(h).toLowerCase().includes('цена'),
  );
  const salePriceIdx = headers.findIndex((h) =>
    String(h).toLowerCase().includes('скидк'),
  );
  const amountIdx = headers.findIndex((h) =>
    String(h).toLowerCase().includes('кол-во'),
  );

  if (nameIdx === -1 || priceIdx === -1 || amountIdx === -1) {
    alert('Не найдены все необходимые колонки: Наименование, Цена, Кол-во');
    return [];
  }

  return rows
    .slice(1)
    .map((row, index) => {
      const name = String(row[nameIdx] ?? '').trim();
      const priceCents = parseMoneyToCents(String(row[priceIdx] ?? ''));
      const salePriceCents =
        salePriceIdx !== -1
          ? parseMoneyToCents(String(row[salePriceIdx] ?? ''))
          : priceCents;
      const amount = Math.max(
        0,
        parseInt(String(row[amountIdx] ?? '0'), 10) || 0,
      );

      return {
        rowNumber: index + 2,
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
