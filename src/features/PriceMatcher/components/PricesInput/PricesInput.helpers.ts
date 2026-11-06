import {
  centsToStr,
  createCalculationId,
  getCalculationKey,
  parseMoneyToCents,
  parseSums,
} from '../../PriceMatcher.helpers';
import type { Calculation, SumTarget } from '../../PriceMatcher.types';
import type { SumRowData } from './PricesInput.types';

export const DEFAULT_TOLERANCE = '0';

// Ids must stay unique across reloads because new rows are persisted
export const createRow = (partial?: Partial<SumRowData>): SumRowData => ({
  id: `sum-row-${createCalculationId()}`,
  amount: '',
  isApprox: false,
  minus: DEFAULT_TOLERANCE,
  plus: DEFAULT_TOLERANCE,
  ...partial,
});

const toleranceToStr = (cents?: number) =>
  cents ? centsToStr(cents) : DEFAULT_TOLERANCE;

export const calculationToRow = (
  calculation: Calculation,
  index: number,
): SumRowData => {
  const calculationKey = getCalculationKey(calculation, index);
  const { targetCents, minusCents, plusCents } = calculation;
  return {
    id: `calc-${calculationKey}`,
    calculationKey,
    amount: centsToStr(targetCents),
    isApprox: (minusCents ?? 0) > 0 || (plusCents ?? 0) > 0,
    minus: toleranceToStr(minusCents),
    plus: toleranceToStr(plusCents),
  };
};

export const parseTolerance = (value: string): number =>
  Math.abs(parseMoneyToCents(value));

// A single row may contain several sums (e.g. pasted "100, 200"), each gets the row tolerance
export const rowToTargets = (row: SumRowData): SumTarget[] => {
  const minusCents = row.isApprox ? parseTolerance(row.minus) : 0;
  const plusCents = row.isApprox ? parseTolerance(row.plus) : 0;
  return parseSums(row.amount).map((targetCents) => ({
    targetCents,
    minusCents,
    plusCents,
  }));
};

export const rowsToTargets = (rows: SumRowData[]): SumTarget[] =>
  rows.flatMap(rowToTargets);

export const isRowMatchingCalculation = (
  row: SumRowData,
  calculation: Calculation,
): boolean => {
  const targets = rowToTargets(row);
  if (targets.length !== 1) return false;
  const [target] = targets;
  return (
    target.targetCents === calculation.targetCents &&
    target.minusCents === (calculation.minusCents ?? 0) &&
    target.plusCents === (calculation.plusCents ?? 0)
  );
};

export const isToleranceSet = (value: string) =>
  value.trim() !== '' && value.trim() !== DEFAULT_TOLERANCE;
