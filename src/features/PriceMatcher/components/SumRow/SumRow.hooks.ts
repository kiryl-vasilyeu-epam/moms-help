import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  centsToStr,
  getTargetRange,
  isWithinTarget,
} from '../../PriceMatcher.helpers';
import { rowToTargets } from '../PricesInput/PricesInput.helpers';
import type { TypographyColor } from '@components';
import type { SumRowProps } from './SumRow.types';

interface StatusLabel {
  text: string;
  color: TypographyColor;
}

export const useSumRow = ({
  row,
  status,
  shouldFocus,
  onChange,
  onToggleApprox,
  onRemove,
  onEnter,
  onSubmit,
}: SumRowProps) => {
  const { t } = useTranslation();
  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldFocus) {
      amountRef.current?.focus();
    }
  }, [shouldFocus]);

  const handleAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      onChange(row.id, { amount: e.target.value }),
    [onChange, row.id],
  );
  const handleMinusChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      onChange(row.id, { minus: e.target.value }),
    [onChange, row.id],
  );
  const handlePlusChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      onChange(row.id, { plus: e.target.value }),
    [onChange, row.id],
  );
  const handleSelectOnFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => e.target.select(),
    [],
  );
  const handleToggleApprox = useCallback(
    () => onToggleApprox(row.id),
    [onToggleApprox, row.id],
  );
  const handleRemove = useCallback(() => onRemove(row.id), [onRemove, row.id]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        onSubmit();
        return;
      }
      onEnter(row.id);
    },
    [onEnter, onSubmit, row.id],
  );

  const range = useMemo(() => {
    const targets = rowToTargets(row);
    if (!row.isApprox || targets.length !== 1) return null;
    const { minCents, maxCents } = getTargetRange(targets[0]);
    if (minCents === maxCents) return null;
    return { min: centsToStr(minCents), max: centsToStr(maxCents) };
  }, [row]);

  const statusLabel = useMemo<StatusLabel | null>(() => {
    if (status.kind === 'new') return null;
    if (status.kind === 'changed') {
      return { text: t('priceMatcher.prices.status.changed'), color: 'info' };
    }
    const { calculation } = status;
    const calculatedCents = calculation.calculatedCents ?? 0;
    if (!calculation.solution?.length) {
      return {
        text: t('priceMatcher.prices.status.noSolution'),
        color: 'danger',
      };
    }
    const sum = centsToStr(calculatedCents);
    if (!isWithinTarget(calculation, calculatedCents)) {
      return {
        text: t('priceMatcher.prices.status.offTarget', { sum }),
        color: 'warning',
      };
    }
    return {
      text: t('priceMatcher.prices.status.calculated', { sum }),
      color: 'success',
    };
  }, [status, t]);

  return {
    amountRef,
    range,
    statusLabel,
    isCalculated: status.kind === 'calculated',
    handleAmountChange,
    handleMinusChange,
    handlePlusChange,
    handleSelectOnFocus,
    handleToggleApprox,
    handleRemove,
    handleKeyDown,
  };
};
