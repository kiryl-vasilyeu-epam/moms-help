import { useLocalStorage, useXLSFileUpload } from '@hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Calculation,
  FailedCalculation,
  PriceItem,
  TransferredItem,
} from './PriceMatcher.types';
import { STORAGE_KEYS } from '@constants';
import {
  centsToStr,
  findExactCombination,
  parseFile,
  parseSums,
  yieldToBrowser,
  exportXLSX,
  exportCalculations,
} from './PriceMatcher.helpers';
import {
  SaveDataInput,
  SaveDataItem,
  SaveDataOrder,
  SettingsSectionData,
  useScreen,
} from '@components';

const SETTINGS_IDS = {
  FIRST_ROW_PRICE_MATCHER: 'firstRowPriceMatcher',
  NAME_COLUMN_PRICE_MATCHER: 'nameColumnPriceMatcher',
  PRICE_COLUMN_PRICE_MATCHER: 'priceColumnPriceMatcher',
  AMOUNT_COLUMN_PRICE_MATCHER: 'amountColumnPriceMatcher',
  DATA_ORDER: 'dataOrder',
};

export const useFileSettings = () => {
  const [firstRow, setFirstRow] = useLocalStorage(
    STORAGE_KEYS.FIRST_ROW_PRICE_MATCHER,
    1,
  );
  const [nameColumn, setNameColumn] = useLocalStorage(
    STORAGE_KEYS.NAME_COLUMN_PRICE_MATCHER,
    0,
  );
  const [priceColumn, setPriceColumn] = useLocalStorage(
    STORAGE_KEYS.PRICE_COLUMN_PRICE_MATCHER,
    1,
  );
  const [amountColumn, setAmountColumn] = useLocalStorage(
    STORAGE_KEYS.AMOUNT_COLUMN_PRICE_MATCHER,
    2,
  );

  const [exportColumnNames, setExportColumnNames] = useLocalStorage(
    STORAGE_KEYS.EXPORT_COLUMN_NAMES_PRICE_MATCHER,
    'Наименование,Цена розничная,Цена со скидкой,Колличество',
  );
  const [exportDataOrder, setExportDataOrder] = useLocalStorage(
    STORAGE_KEYS.EXPORT_DATA_ORDER_PRICE_MATCHER,
    'name,retailPrice,discountPrice,amount',
  );

  return {
    firstRow,
    setFirstRow,
    nameColumn,
    setNameColumn,
    priceColumn,
    setPriceColumn,
    amountColumn,
    setAmountColumn,
    exportColumnNames,
    setExportColumnNames,
    exportDataOrder,
    setExportDataOrder,
  };
};

export const usePriceMatcher = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState({
    title: '',
    details: '',
    variants: '',
    time: '',
  });
  const [failedCalculations, setFailedCalculations] = useState<
    FailedCalculation[]
  >([]);
  const [showNoSolutionModal, setShowNoSolutionModal] = useState(false);
  const { isModalOpen, openModal, closeModal } = useScreen();

  const [items, setItems] = useLocalStorage<PriceItem[]>(
    STORAGE_KEYS.PRICE_MATCHER_ITEMS_KEY,
    [],
  );
  const [usageHistory, setUsageHistory] = useLocalStorage<Calculation[]>(
    STORAGE_KEYS.PRICE_MATCHER_USAGE_HISTORY_KEY,
    [],
  );
  const [discountPercent, setDiscountPercent] = useLocalStorage(
    STORAGE_KEYS.DISCOUNT_PERCENT,
    30,
  );
  const [discountInputValue, setDiscountInputValue] = useState(
    String(discountPercent),
  );
  const {
    firstRow,
    nameColumn,
    priceColumn,
    amountColumn,
    exportColumnNames,
    exportDataOrder,

    setFirstRow,
    setNameColumn,
    setPriceColumn,
    setAmountColumn,
    setExportColumnNames,
    setExportDataOrder,
  } = useFileSettings();
  const [transferredData, setTransferredData] = useLocalStorage<
    TransferredItem[] | null
  >(STORAGE_KEYS.PRICE_MATCHER_TRANSFER_DATA, null);

  const [sumInput, setSumInput] = useState('');

  const fileUpload = useXLSFileUpload<PriceItem[]>();

  useEffect(() => {
    if (transferredData && transferredData.length > 0) {
      const convertedItems: PriceItem[] = transferredData.map((item, idx) => ({
        rowNumber: idx + 2,
        name: item.name,
        priceCents: Math.round(item.price * 100),
        salePriceCents: Math.round(item.price * 100),
        amount: item.amount,
        originalAmount: item.amount,
        remainingAmount: item.amount,
        usedAmount: 0,
      }));

      setItems(convertedItems);
      setUsageHistory([]);
    }
  }, [setItems, setUsageHistory, transferredData]);

  const handleProcessFile = () => {
    const items = fileUpload.processFiles(parseFile, {
      discountPercent,
      firstRow,
      nameColumn,
      priceColumn,
      amountColumn,
    });
    if (!items) return;
    setItems(items);
    setUsageHistory([]);
  };

  const handleClearData = () => {
    fileUpload.clearFiles();
    setItems([]);
    setUsageHistory([]);
    setTransferredData(null);
    closeModal();
  };

  const handleCalculate = useCallback(
    async (
      sums?: string,
      options?: { initialItems?: PriceItem[]; resetHistory?: boolean },
    ) => {
      console.log({
        sums,
        sumInput,
        items,
        usageHistory,
      });
      const targetCentsList = parseSums(sums ?? sumInput);

      if (targetCentsList.length === 0) {
        alert('Пожалуйста, введите хотя бы одну валидную сумму.');
        return;
      }

      setLoading(true);
      setLoadingText({
        title: 'Подготовка данных...',
        details: '',
        variants: '',
        time: '',
      });
      setFailedCalculations([]);

      try {
        await yieldToBrowser();

        const baseItems = options?.initialItems ?? items;
        const baseHistory = options?.resetHistory ? [] : usageHistory;
        let calculationNumber = baseHistory.length + 1;
        const newHistory: Calculation[] = [];
        const failedCalcs: FailedCalculation[] = [];
        const updatedItems = [...baseItems];
        const totalCalculations = targetCentsList.length;

        for (let i = 0; i < targetCentsList.length; i++) {
          const targetCents = targetCentsList[i];

          setLoadingText({
            title: `Обработка ${i + 1} из ${totalCalculations} сумм...`,
            details: '',
            variants: '',
            time: '',
          });
          await yieldToBrowser();

          // Filter items with remaining quantity - findExactCombination handles the rest
          const availableItems = updatedItems.filter((item) => {
            if (!item || typeof item !== 'object') return false;
            const remaining =
              item.remainingAmount ??
              (item.originalAmount || item.amount || 0) -
                (item.usedAmount || 0);
            return remaining > 0 && (item.salePriceCents || 0) > 0;
          });

          if (availableItems.length === 0) {
            failedCalcs.push({
              targetCents,
              reason: 'no_items',
            });
            newHistory.push({
              calculationNumber: calculationNumber++,
              targetCents,
              calculatedCents: null,
              solution: null,
              timestamp: new Date().toISOString(),
            });
            continue;
          }

          setLoadingText({
            title: `Поиск комбинации для ${centsToStr(targetCents)} (${i + 1}/${totalCalculations})...`,
            details: '',
            variants: '',
            time: '',
          });

          const solution = await findExactCombination(
            targetCents,
            availableItems,
            (progress) => {
              const seconds = Math.floor(progress.elapsed / 1000);
              setLoadingText({
                title: `Поиск комбинации для ${centsToStr(targetCents)} (${i + 1}/${totalCalculations})`,
                details: `Обработано товаров: ${progress.processedItems}/${progress.totalItems}`,
                variants: `Вариантов: ${progress.dpSize}`,
                time: `${seconds}с`,
              });
            },
          );

          if (solution && solution.length > 0) {
            let calculatedCents = 0;
            solution.forEach((item) => {
              calculatedCents += (item.salePriceCents || 0) * item.quantity;
            });

            // Update item quantities
            solution.forEach((solutionItem) => {
              if (!solutionItem?.name) return;
              const item = updatedItems.find(
                (i) => i?.name === solutionItem.name,
              );
              if (item && solutionItem.quantity > 0) {
                item.usedAmount =
                  (item.usedAmount || 0) + solutionItem.quantity;
                const originalAmount = item.originalAmount || item.amount || 0;
                item.remainingAmount = Math.max(
                  0,
                  originalAmount - item.usedAmount,
                );
              }
            });

            newHistory.push({
              calculationNumber: calculationNumber++,
              targetCents,
              calculatedCents,
              solution: solution,
              timestamp: new Date().toISOString(),
            });
          } else {
            failedCalcs.push({
              targetCents,
              reason: 'no_combination',
            });
            newHistory.push({
              calculationNumber: calculationNumber++,
              targetCents,
              calculatedCents: null,
              solution: null,
              timestamp: new Date().toISOString(),
            });
          }
        }

        // Renumber all calculations to be sequential
        const allHistory = [...baseHistory, ...newHistory];
        allHistory.forEach((calc, idx) => {
          if (calc) {
            calc.calculationNumber = idx + 1;
          }
        });

        setItems(updatedItems);
        setUsageHistory(allHistory);
        setFailedCalculations(failedCalcs);

        if (failedCalcs.length > 0) {
          setShowNoSolutionModal(true);
        } else {
          setSumInput('');
        }
      } catch (error) {
        console.error('Error during calculation:', error);
        alert(
          'Произошла ошибка при вычислении. Проверьте консоль для деталей.',
        );
      } finally {
        setLoading(false);
        setLoadingText({
          title: '',
          details: '',
          variants: '',
          time: '',
        });
      }
    },
    [sumInput, usageHistory, items, setItems, setUsageHistory],
  );

  const settings: SettingsSectionData[] = useMemo(() => {
    const exportColumnsNamesArray = exportColumnNames
      .split(',')
      .map((label) => label.trim());
    const exportDataOrderArray = exportDataOrder
      .split(',')
      .map((label, index) => ({
        id: label.trim(),
        label: label.trim(),
        withInput: true,
        inputValue: exportColumnsNamesArray[index],
      }));

    return [
      {
        id: 'upload',
        title: 'Файл для загрузки',
        settings: [
          {
            id: SETTINGS_IDS.FIRST_ROW_PRICE_MATCHER,
            type: 'input',
            label: 'Номер первой строки с данными',
            value: String(firstRow + 1),
          },
          {
            id: SETTINGS_IDS.NAME_COLUMN_PRICE_MATCHER,
            type: 'input',
            label: 'Номер колонки с наименованием',
            value: String(nameColumn + 1),
          },
          {
            id: SETTINGS_IDS.PRICE_COLUMN_PRICE_MATCHER,
            type: 'input',
            label: 'Номер колонки с ценой',
            value: String(priceColumn + 1),
          },
          {
            id: SETTINGS_IDS.AMOUNT_COLUMN_PRICE_MATCHER,
            type: 'input',
            label: 'Номер колонки с количеством',
            value: String(amountColumn + 1),
          },
        ],
      },
      {
        id: 'export',
        title: 'Экспорт данных',
        settings: [
          {
            id: SETTINGS_IDS.DATA_ORDER,
            type: 'order',
            label: 'Порядок данных при экспорте',
            items: exportDataOrderArray,
          },
        ],
      },
    ];
  }, [
    exportColumnNames,
    exportDataOrder,
    firstRow,
    nameColumn,
    priceColumn,
    amountColumn,
  ]);

  const handleCloseNoSolutionModal = () => {
    setShowNoSolutionModal(false);
  };

  const handleRemoveCalculation = useCallback(
    (index: number) => {
      console.log({ index, usageHistory });
      if (index < 0 || index >= usageHistory.length) return;

      const calculation = usageHistory[index];
      const newItems = [...items];

      // Restore item quantities
      if (calculation.solution && calculation.solution.length > 0) {
        calculation.solution.forEach((solutionItem) => {
          const item = newItems.find((i) => i.name === solutionItem.name);
          if (item) {
            item.usedAmount = Math.max(
              0,
              (item.usedAmount || 0) - solutionItem.quantity,
            );
            item.remainingAmount =
              (item.remainingAmount || 0) + solutionItem.quantity;
            const maxAmount = item.originalAmount || item.amount;
            if (item.remainingAmount > maxAmount) {
              item.remainingAmount = maxAmount;
            }
          }
        });
      }

      const newHistory = usageHistory.filter((_, i) => i !== index);
      newHistory.forEach((calc, idx) => {
        calc.calculationNumber = idx + 1;
      });

      setItems(newItems);
      setUsageHistory(newHistory);
      setItems(newItems);
      setUsageHistory(newHistory);
    },
    [items, usageHistory, setItems, setUsageHistory],
  );

  const handleExportRemainingItems = useCallback(() => {
    exportXLSX(items, {
      exportColumnNames: exportColumnNames
        .split(',')
        .map((name) => name.trim()),
      exportDataOrder: exportDataOrder.split(',').map((key) => key.trim()),
    });
  }, [exportColumnNames, exportDataOrder, items]);

  const handleExportCalculations = useCallback(() => {
    exportCalculations({
      usageHistory,
      items,
    });
  }, [usageHistory, items]);

  const onSettingsSave = useCallback(
    (data: SaveDataItem[]) => {
      data.forEach((item) => {
        // setExportColumnNames,
        // setExportDataOrder,
        switch (item.id) {
          case SETTINGS_IDS.FIRST_ROW_PRICE_MATCHER:
            setFirstRow(Number((item as SaveDataInput).value) - 1);
            break;
          case SETTINGS_IDS.NAME_COLUMN_PRICE_MATCHER:
            setNameColumn(Number((item as SaveDataInput).value) - 1);
            break;
          case SETTINGS_IDS.PRICE_COLUMN_PRICE_MATCHER:
            setPriceColumn(Number((item as SaveDataInput).value) - 1);
            break;
          case SETTINGS_IDS.AMOUNT_COLUMN_PRICE_MATCHER:
            setAmountColumn(Number((item as SaveDataInput).value) - 1);
            break;
          case SETTINGS_IDS.DATA_ORDER: {
            const order = (item as SaveDataOrder).items;
            const [dataOrder, columnNames] = order.reduce<[string[], string[]]>(
              (acc, curr) => {
                acc[0].push(curr.id);
                acc[1].push(curr.inputValue ?? '');
                return acc;
              },
              [[], []],
            );
            setExportColumnNames(columnNames.map((s) => s.trim()).join(', '));
            setExportDataOrder(dataOrder.map((s) => s.trim()).join(', '));
            break;
          }
        }
      });
    },
    [
      setAmountColumn,
      setExportColumnNames,
      setExportDataOrder,
      setFirstRow,
      setNameColumn,
      setPriceColumn,
    ],
  );

  const onDiscountRecalculate = useCallback(async () => {
    const newDiscount = Number(discountInputValue);
    if (Number.isNaN(newDiscount) || newDiscount < 0 || newDiscount > 100) {
      alert('Некорректное значение скидки. Введите число от 0 до 100.');
      return;
    }

    setDiscountPercent(newDiscount);

    // Extract sums from existing history before clearing
    const sumsToRecalculate = usageHistory
      .map((calc) => centsToStr(calc.targetCents))
      .join(', ');

    // Recalculate salePriceCents for all items and reset usage
    const recalculatedItems: PriceItem[] = items.map((item) => ({
      ...item,
      salePriceCents:
        item.priceCents - Math.round((item.priceCents * newDiscount) / 100),
      usedAmount: 0,
      remainingAmount: item.originalAmount,
    }));

    // Recalculate with fresh items and reset history
    if (sumsToRecalculate) {
      await handleCalculate(sumsToRecalculate, {
        initialItems: recalculatedItems,
        resetHistory: true,
      });
    } else {
      // No calculations to recalculate, just update items
      setItems(recalculatedItems);
      setUsageHistory([]);
    }
  }, [
    discountInputValue,
    setDiscountPercent,
    items,
    usageHistory,
    setItems,
    setUsageHistory,
    handleCalculate,
  ]);

  const stats = useMemo(() => {
    return {
      total: items.reduce((acc, item) => acc + (item.originalAmount || 0), 0),
      used: usageHistory.reduce(
        (acc, calc) =>
          acc +
          (calc.solution
            ? calc.solution.reduce((sum, item) => sum + item.quantity, 0)
            : 0),
        0,
      ),
      left: items.reduce((acc, item) => acc + (item.remainingAmount || 0), 0),
      calculations: usageHistory.length,
      failedCalculation: usageHistory.filter(
        (calc) => !calc.solution || calc.solution.length === 0,
      ).length,
    };
  }, [items, usageHistory]);

  return {
    items,
    usageHistory,
    handleProcessFile,
    fileUpload,
    handleClearData,
    isModalOpen,
    openModal,
    closeModal,
    settings,
    discountPercent,
    setDiscountPercent,
    discountInputValue,
    setDiscountInputValue,
    sumInput,
    setSumInput,
    handleCalculate,
    loading,
    loadingText,
    showNoSolutionModal,
    failedCalculations,
    handleCloseNoSolutionModal,
    handleRemoveCalculation,
    handleExportRemainingItems,
    onSettingsSave,
    handleExportCalculations,
    onDiscountRecalculate,
    stats,
  };
};
