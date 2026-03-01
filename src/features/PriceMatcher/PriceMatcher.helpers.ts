import * as XLSX from 'xlsx-js-style';
import {
  Calculation,
  PriceItem,
  ProgressUpdate,
  SolutionItem,
} from './PriceMatcher.types';

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

export const parseSums = (input: string): number[] => {
  const matches = String(input).match(/-?\d+(?:[.,]\d+)?/g) ?? [];
  return matches
    .map((m) => parseMoneyToCents(m))
    .filter((c) => Number.isInteger(c) && c > 0);
};

export const yieldToBrowser = (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 0));
};

export const centsToStr = (cents: number): string => {
  if (!Number.isInteger(cents)) {
    cents = Math.round(cents);
  }

  const rubles = Math.floor(cents / 100);
  const kopecks = cents % 100;

  if (kopecks === 0) {
    return `${rubles},00`;
  }

  return `${rubles},${String(kopecks).padStart(2, '0')}`;
};

// Back-pointer structure: [itemIndex, quantity, previousSum]
type BackPointer = [number, number, number];

interface ValidItem {
  item: PriceItem;
  remainingQty: number;
  unitCents: number;
  originalIndex: number;
}

// Greedy approach: take expensive items first, try to hit exact target
const tryGreedy = (
  targetCents: number,
  validItems: ValidItem[],
): SolutionItem[] | null => {
  const result: SolutionItem[] = [];
  let remaining = targetCents;

  // Items are already sorted by price descending
  for (const { item, remainingQty, unitCents } of validItems) {
    if (remaining <= 0) break;
    if (unitCents > remaining) continue;

    const maxCanTake = Math.min(
      remainingQty,
      Math.floor(remaining / unitCents),
    );
    if (maxCanTake > 0) {
      result.push({ ...item, quantity: maxCanTake });
      remaining -= maxCanTake * unitCents;
    }
  }

  // Greedy only succeeds if we hit exact target
  if (remaining === 0) {
    return result;
  }

  return null;
};

export const findExactCombination = async (
  targetCents: number,
  availableItems: PriceItem[],
  onProgress?: (progress: ProgressUpdate) => void,
): Promise<SolutionItem[] | null> => {
  // Safety checks
  if (!Array.isArray(availableItems) || availableItems.length === 0) {
    return null;
  }

  if (!Number.isInteger(targetCents) || targetCents <= 0) {
    return null;
  }

  // Safeguards
  const MAX_TIME_MS = 60000; // 60 seconds timeout
  const YIELD_INTERVAL = 5000; // Yield every 5000 operations
  const startTime = Date.now();

  // Preprocess: filter and sort items by price descending (greedy optimization)
  const validItems = availableItems
    .map((item, idx) => {
      if (!item || typeof item !== 'object') return null;
      const remainingQty = Math.max(
        0,
        item.remainingAmount || item.amount || 0,
      );
      const unitCents = item.salePriceCents || 0;
      if (unitCents <= 0 || remainingQty <= 0) return null;
      return { item, remainingQty, unitCents, originalIndex: idx };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => b.unitCents - a.unitCents); // Sort descending by price

  if (validItems.length === 0) {
    return null;
  }

  // Quick feasibility check
  const minPrice = validItems[validItems.length - 1].unitCents;
  const maxPossible = validItems.reduce(
    (sum, v) => sum + v.unitCents * v.remainingQty,
    0,
  );

  // If target exceeds what's possible, return all available items
  if (targetCents > maxPossible) {
    return validItems.map((v) => ({ ...v.item, quantity: v.remainingQty }));
  }

  if (targetCents < minPrice) {
    return null;
  }

  // Try greedy approach first (much faster for large sums)
  const greedyResult = tryGreedy(targetCents, validItems);
  if (greedyResult) {
    return greedyResult;
  }

  // Use back-pointers instead of storing full combinations
  // backPointer[sum] = [itemIndex, quantity, previousSum] - how we reached this sum
  const backPointer = new Map<number, BackPointer>();

  // Track reachable sums - use Set for O(1) lookup
  let reachableSums = new Set<number>([0]);

  let operations = 0;
  const totalItems = validItems.length;

  // Calculate remaining value for each position (for pruning)
  const remainingValue = new Array(validItems.length + 1).fill(0);
  for (let i = validItems.length - 1; i >= 0; i--) {
    remainingValue[i] =
      remainingValue[i + 1] +
      validItems[i].unitCents * validItems[i].remainingQty;
  }

  // Process each item
  for (let itemIdx = 0; itemIdx < validItems.length; itemIdx++) {
    const { remainingQty, unitCents } = validItems[itemIdx];

    // Collect sums to process (filter first, then iterate)
    const sumsToProcess: number[] = [];
    for (const currentSum of reachableSums) {
      // Pruning: skip if we can't reach target even with all remaining items
      if (currentSum + remainingValue[itemIdx] < targetCents) continue;
      if (currentSum > targetCents) continue;
      sumsToProcess.push(currentSum);
    }

    // Process each valid sum
    for (const currentSum of sumsToProcess) {
      const maxQty = Math.min(
        remainingQty,
        Math.floor((targetCents - currentSum) / unitCents),
      );

      for (let qty = 1; qty <= maxQty; qty++) {
        const newSum = currentSum + unitCents * qty;

        operations++;

        // Yield periodically
        if (operations % YIELD_INTERVAL === 0) {
          await yieldToBrowser();
          if (onProgress) {
            onProgress({
              processedItems: itemIdx + 1,
              totalItems,
              dpSize: reachableSums.size,
              elapsed: Date.now() - startTime,
            });
          }

          // Check timeout
          if (Date.now() - startTime > MAX_TIME_MS) {
            console.warn('Calculation timeout reached');
            return null;
          }
        }

        // Only set if not already reachable (first path is fine, we optimize for speed not item count)
        if (!reachableSums.has(newSum)) {
          reachableSums.add(newSum);
          backPointer.set(newSum, [itemIdx, qty, currentSum]);

          // Early exit if we found the target
          if (newSum === targetCents) {
            return reconstructSolution(targetCents, backPointer, validItems);
          }
        }
      }
    }

    // Prune unreachable sums (can't reach target with remaining items)
    const nextReachable = new Set<number>();
    for (const sum of reachableSums) {
      if (
        sum + remainingValue[itemIdx + 1] >= targetCents &&
        sum <= targetCents
      ) {
        nextReachable.add(sum);
      }
    }
    reachableSums = nextReachable;
  }

  // Check if we found the target
  if (backPointer.has(targetCents)) {
    return reconstructSolution(targetCents, backPointer, validItems);
  }

  return null;
};

// Reconstruct the solution from back-pointers
const reconstructSolution = (
  targetCents: number,
  backPointer: Map<number, BackPointer>,
  validItems: ValidItem[],
): SolutionItem[] => {
  const result: SolutionItem[] = [];
  let currentSum = targetCents;

  while (currentSum > 0 && backPointer.has(currentSum)) {
    const [itemIdx, qty, prevSum] = backPointer.get(currentSum)!;
    result.push({ ...validItems[itemIdx].item, quantity: qty });
    currentSum = prevSum;
  }

  return result.reverse();
};

export const exportXLSX = (
  items: PriceItem[],
  {
    exportColumnNames,
    exportDataOrder,
  }: {
    exportColumnNames: string[];
    exportDataOrder: string[];
  },
) => {
  const remainingItems = items.filter((item) => {
    const remaining =
      item.remainingAmount ??
      (item.originalAmount || item.amount || 0) - (item.usedAmount || 0);
    return remaining > 0;
  });

  if (remainingItems.length === 0) {
    alert('Нет остатков для экспорта');
    return;
  }

  const data = [exportColumnNames];

  remainingItems.forEach((item) => {
    const remaining =
      item.remainingAmount ??
      (item.originalAmount ?? item.amount ?? 0) - (item.usedAmount ?? 0);

    const fullData = {
      name: item.name,
      retailPrice: centsToStr(item.priceCents).replace('.', ','),
      discountPrice: centsToStr(item.salePriceCents).replace('.', ','),
      amount: remaining.toString(),
    };

    data.push(
      exportDataOrder.map((key) => (fullData as Record<string, string>)[key]),
    );
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data as (string | number | boolean)[][]);
  ws['!cols'] = [{ wch: 70 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];

  XLSX.utils.book_append_sheet(wb, ws, 'Остатки');

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
  const filename = `остатки_${dateStr}.xlsx`;

  XLSX.writeFile(wb, filename);
};

export const exportCalculations = ({
  usageHistory,
  items,
}: {
  usageHistory: Calculation[];
  items: PriceItem[];
}) => {
  const successfulCalculations = usageHistory.filter(
    (historyItem) =>
      historyItem.solution &&
      Array.isArray(historyItem.solution) &&
      historyItem.solution.length > 0,
  );

  if (successfulCalculations.length === 0) {
    alert('Нет успешных расчетов для экспорта');
    return;
  }

  let htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <style>
          @page {
              size: A4;
              margin: 1.5cm 1cm;
          }
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 15px;
              line-height: 1.4;
              font-size: 10pt;
          }
          h1 {
              color: #333;
              border-bottom: 2px solid #667eea;
              padding-bottom: 8px;
              margin-top: 0;
              margin-bottom: 15px;
              font-size: 16pt;
          }
          .calculation {
              margin: 20px 0;
              padding: 12px;
              border: 1px solid #ddd;
              page-break-inside: avoid;
          }
          .calculation-header {
              font-size: 12pt;
              font-weight: bold;
              color: #667eea;
              margin-bottom: 10px;
          }
          .calculation-total {
              font-weight: bold;
              margin-top: 8px;
              color: #333;
              font-size: 11pt;
          }
          table {
              width: 100%;
              border-collapse: collapse;
              margin: 10px 0;
              table-layout: fixed;
              font-size: 9pt;
          }
          th, td {
              border: 1px solid #333;
              padding: 6px 4px;
              text-align: left;
              word-wrap: break-word;
          }
          th {
              background-color: #667eea;
              color: white;
              font-weight: bold;
              font-size: 9pt;
          }
          td {
              background-color: white;
          }
          tr:nth-child(even) td {
              background-color: #f2f2f2;
          }
          .col-name {
              width: 35%;
          }
          .col-price {
              width: 15%;
          }
          .col-sale-price {
              width: 15%;
          }
          .col-quantity {
              width: 12%;
              text-align: center;
          }
          .col-total {
              width: 23%;
              text-align: right;
          }
          .no-solution {
              color: #dc3545;
              font-style: italic;
          }
          @media print {
              body {
                  margin: 0;
                  padding: 10px;
              }
              .calculation {
                  page-break-inside: avoid;
              }
          }
      </style>
  </head>
  <body>
      <h1>Отчет по расчетам</h1>
      <p style="margin-bottom: 20px; font-size: 10pt;">Дата создания: ${new Date().toLocaleString('ru-RU')}</p>
  `;

  successfulCalculations.forEach((historyItem, index) => {
    const targetCents = historyItem.targetCents || 0;

    htmlContent += `<div class="calculation">`;
    htmlContent += `<div class="calculation-header">Расчет #${historyItem.calculationNumber || index + 1}: Целевая сумма ${centsToStr(targetCents)}</div>`;

    let calculatedCents = 0;
    historyItem.solution?.forEach((item) => {
      if (!item || typeof item !== 'object') return;
      const unitCents = item.salePriceCents || 0;
      const qty = item.quantity || 0;
      calculatedCents += unitCents * qty;
    });

    htmlContent += `<table>`;
    htmlContent += `<thead><tr><th class="col-name">Наименование</th><th class="col-price">Цена</th><th class="col-sale-price">Цена со скидкой</th><th class="col-quantity">Кол-во</th><th class="col-total">Сумма</th></tr></thead>`;
    htmlContent += `<tbody>`;

    historyItem.solution?.forEach((item) => {
      if (!item || typeof item !== 'object' || !item.name) return;
      const unitCents = item.salePriceCents || 0;
      const qty = item.quantity || 0;
      if (qty <= 0) return;

      const originalItem = items.find((i) => i?.name === item.name);
      const regularPriceCents = originalItem?.priceCents ?? unitCents;
      const itemTotalCents = unitCents * qty;

      htmlContent += `<tr>`;
      htmlContent += `<td class="col-name">${item.name}</td>`;
      htmlContent += `<td class="col-price">${centsToStr(regularPriceCents)}</td>`;
      htmlContent += `<td class="col-sale-price">${centsToStr(unitCents)}</td>`;
      htmlContent += `<td class="col-quantity">${qty}</td>`;
      htmlContent += `<td class="col-total">${centsToStr(itemTotalCents)}</td>`;
      htmlContent += `</tr>`;
    });

    htmlContent += `</tbody>`;
    htmlContent += `</table>`;
    htmlContent += `<div class="calculation-total">Итого: ${centsToStr(calculatedCents)}</div>`;
    htmlContent += `</div>`;
  });

  htmlContent += `</body></html>`;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8;',
  });
  const link = document.createElement('a');
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
  const filename = `отчет_по_расчетам_${dateStr}.doc`;

  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};
