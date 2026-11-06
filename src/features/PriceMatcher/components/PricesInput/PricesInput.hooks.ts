import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '@hooks';
import { STORAGE_KEYS } from '@constants';
import { getCalculationKey } from '../../PriceMatcher.helpers';
import type {
  PricesInputProps,
  SumRowData,
  SumRowView,
} from './PricesInput.types';
import {
  DEFAULT_TOLERANCE,
  calculationToRow,
  createRow,
  isRowMatchingCalculation,
  isToleranceSet,
  rowToTargets,
  rowsToTargets,
} from './PricesInput.helpers';

type RowUpdater = (row: SumRowData, rows: SumRowData[]) => SumRowData;

export const usePricesInput = ({
  usageHistory,
  onApply,
  onRemoveCalculation,
}: PricesInputProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  // Edits of already calculated sums, keyed by calculation
  const [drafts, setDrafts] = useLocalStorage<Record<string, SumRowData>>(
    STORAGE_KEYS.PRICE_MATCHER_SUM_DRAFTS,
    {},
  );
  const [storedNewRows, setNewRows] = useLocalStorage<SumRowData[]>(
    STORAGE_KEYS.PRICE_MATCHER_NEW_SUM_ROWS,
    [],
  );
  const [fallbackRow] = useState(createRow);
  const newRows = useMemo(
    () => (storedNewRows.length > 0 ? storedNewRows : [fallbackRow]),
    [storedNewRows, fallbackRow],
  );

  // Drop edits of calculations that no longer exist (e.g. after discount recalculation)
  useEffect(() => {
    if (usageHistory.some(({ id }) => !id)) return;
    const keys = new Set(usageHistory.map(({ id }) => id));
    const staleKeys = Object.keys(drafts).filter((key) => !keys.has(key));
    if (staleKeys.length === 0) return;
    const next = { ...drafts };
    staleKeys.forEach((key) => delete next[key]);
    setDrafts(next);
  }, [usageHistory, drafts, setDrafts]);
  const [focusId, setFocusId] = useState<string | null>(null);

  const rowViews = useMemo<SumRowView[]>(() => {
    const calculatedViews = usageHistory.map((calculation, index) => {
      const key = getCalculationKey(calculation, index);
      const draft = drafts[key] as SumRowData | undefined;
      if (draft && !isRowMatchingCalculation(draft, calculation)) {
        return { row: draft, status: { kind: 'changed' as const } };
      }
      return {
        row: draft ?? calculationToRow(calculation, index),
        status: { kind: 'calculated' as const, calculation },
      };
    });
    const newViews = newRows.map((row) => ({
      row,
      status: { kind: 'new' as const },
    }));
    return [...calculatedViews, ...newViews];
  }, [usageHistory, drafts, newRows]);

  const rows = useMemo(() => rowViews.map(({ row }) => row), [rowViews]);

  const changedCalculations = useMemo(
    () =>
      usageHistory.filter((calculation, index) => {
        const draft = drafts[getCalculationKey(calculation, index)] as
          | SumRowData
          | undefined;
        return draft && !isRowMatchingCalculation(draft, calculation);
      }),
    [usageHistory, drafts],
  );

  const newTargets = useMemo(() => rowsToTargets(newRows), [newRows]);
  const pendingCount = changedCalculations.length + newTargets.length;

  const updateRow = useCallback(
    (id: string, updater: RowUpdater) => {
      const current = rows.find((row) => row.id === id);
      if (!current) return;
      const updated = updater(current, rows);
      const { calculationKey } = current;
      if (calculationKey) {
        setDrafts({ ...drafts, [calculationKey]: updated });
        return;
      }
      setNewRows(newRows.map((row) => (row.id === id ? updated : row)));
    },
    [rows, drafts, newRows, setDrafts, setNewRows],
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setFocusId(newRows[newRows.length - 1]?.id ?? null);
  }, [newRows]);

  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleChangeRow = useCallback(
    (id: string, patch: Partial<SumRowData>) =>
      updateRow(id, (row) => ({ ...row, ...patch })),
    [updateRow],
  );

  const handleToggleApprox = useCallback(
    (id: string) =>
      updateRow(id, (row, allRows) => {
        if (row.isApprox) return { ...row, isApprox: false };
        if (isToleranceSet(row.minus) || isToleranceSet(row.plus)) {
          return { ...row, isApprox: true };
        }
        // Prefill tolerance from the closest previous approximate row
        const index = allRows.findIndex(({ id: rowId }) => rowId === id);
        const template = allRows
          .slice(0, index)
          .reverse()
          .find(
            (item) =>
              item.isApprox &&
              (isToleranceSet(item.minus) || isToleranceSet(item.plus)),
          );
        return {
          ...row,
          isApprox: true,
          minus: template?.minus ?? DEFAULT_TOLERANCE,
          plus: template?.plus ?? DEFAULT_TOLERANCE,
        };
      }),
    [updateRow],
  );

  const handleRemoveRow = useCallback(
    (id: string) => {
      const row = rows.find((item) => item.id === id);
      if (!row) return;
      const { calculationKey } = row;
      if (!calculationKey) {
        const next = newRows.filter((item) => item.id !== id);
        setNewRows(next.length > 0 ? next : [createRow()]);
        return;
      }
      const index = usageHistory.findIndex(
        (calculation, calculationIndex) =>
          getCalculationKey(calculation, calculationIndex) === calculationKey,
      );
      if (index === -1) return;
      const confirmed = confirm(
        t('priceMatcher.calculations.deleteConfirm', {
          number: usageHistory[index].calculationNumber || index + 1,
        }),
      );
      if (!confirmed) return;
      const nextDrafts = { ...drafts };
      delete nextDrafts[calculationKey];
      setDrafts(nextDrafts);
      onRemoveCalculation(index);
    },
    [
      rows,
      newRows,
      drafts,
      usageHistory,
      onRemoveCalculation,
      setDrafts,
      setNewRows,
      t,
    ],
  );

  const handleAddRow = useCallback(() => {
    const row = createRow();
    setNewRows([...newRows, row]);
    setFocusId(row.id);
  }, [newRows, setNewRows]);

  const handleEnter = useCallback(
    (id: string) => {
      const index = rows.findIndex((row) => row.id === id);
      if (index === -1) return;
      if (index < rows.length - 1) {
        setFocusId(rows[index + 1].id);
        return;
      }
      if (!rows[index].amount.trim()) return;
      handleAddRow();
    },
    [rows, handleAddRow],
  );

  const handleReset = useCallback(() => {
    const row = createRow();
    setDrafts({});
    setNewRows([row]);
    setFocusId(row.id);
  }, [setDrafts, setNewRows]);

  const handleSubmit = useCallback(() => {
    if (pendingCount === 0) return;
    const changedTargets = changedCalculations.flatMap((calculation) => {
      const index = usageHistory.indexOf(calculation);
      return rowToTargets(drafts[getCalculationKey(calculation, index)]);
    });
    const removeCalculationIds = changedCalculations
      .map(({ id }) => id)
      .filter((id): id is string => Boolean(id));

    setDrafts({});
    setNewRows([createRow()]);
    setIsOpen(false);
    onApply({
      removeCalculationIds,
      targets: [...changedTargets, ...newTargets],
    });
  }, [
    pendingCount,
    changedCalculations,
    usageHistory,
    drafts,
    newTargets,
    onApply,
    setDrafts,
    setNewRows,
  ]);

  return {
    isOpen,
    rowViews,
    focusId,
    pendingCount,
    handleOpen,
    handleClose,
    handleChangeRow,
    handleToggleApprox,
    handleRemoveRow,
    handleAddRow,
    handleEnter,
    handleReset,
    handleSubmit,
  };
};
