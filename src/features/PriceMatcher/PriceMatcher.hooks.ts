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
} from './PriceMatcher.helpers';
import { SettingsSectionData, useScreen } from '@components';

const SETTINGS_IDS = {
  FIRST_ROW_PRICE_MATCHER: 'firstRowPriceMatcher',
  NAME_COLUMN_PRICE_MATCHER: 'nameColumnPriceMatcher',
  PRICE_COLUMN_PRICE_MATCHER: 'priceColumnPriceMatcher',
  AMOUNT_COLUMN_PRICE_MATCHER: 'amountColumnPriceMatcher',
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

  return {
    firstRow,
    setFirstRow,
    nameColumn,
    setNameColumn,
    priceColumn,
    setPriceColumn,
    amountColumn,
    setAmountColumn,
  };
};

export const usePriceMatcher = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [failedCalculations, setFailedCalculations] = useState<
    FailedCalculation[]
  >([]);
  const [showNoSolutionModal, setShowNoSolutionModal] = useState(false);
  const { isModalOpen, openModal, closeModal } = useScreen();

  const [items, setItems] = useLocalStorage<PriceItem[]>(
    STORAGE_KEYS.PRICE_MATCHER_ITEMS_KEY,
    [],
  );
  const [originalItems, setOriginalItems] = useLocalStorage<PriceItem[]>(
    STORAGE_KEYS.PRICE_MATCHER_ORIGINAL_ITEMS_KEY,
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
  const { firstRow, nameColumn, priceColumn, amountColumn } = useFileSettings();
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
      setOriginalItems(convertedItems.map((item) => ({ ...item })));
      setUsageHistory([]);
    }
  }, [setItems, setOriginalItems, setUsageHistory, transferredData]);

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
    setOriginalItems(items.map((item) => ({ ...item })));
    setUsageHistory([]);
  };

  const handleClearData = () => {
    fileUpload.clearFiles();
    setItems([]);
    setOriginalItems([]);
    setUsageHistory([]);
    setTransferredData(null);
  };

  const handleCalculate = useCallback(async () => {
    const targetCentsList = parseSums(sumInput);

    if (targetCentsList.length === 0) {
      alert('Пожалуйста, введите хотя бы одну валидную сумму.');
      return;
    }

    setLoading(true);
    setLoadingText('Подготовка к вычислению...');
    setFailedCalculations([]);

    try {
      await yieldToBrowser();

      let calculationNumber = usageHistory.length + 1;
      const newHistory: Calculation[] = [];
      const failedCalcs: FailedCalculation[] = [];
      const updatedItems = [...items];
      const totalCalculations = targetCentsList.length;

      for (let i = 0; i < targetCentsList.length; i++) {
        const targetCents = targetCentsList[i];

        setLoadingText(`Обработка ${i + 1} из ${totalCalculations} сумм...`);
        await yieldToBrowser();

        const availableItems = updatedItems
          .filter((item) => {
            if (!item || typeof item !== 'object') return false;
            const remaining =
              item.remainingAmount ??
              (item.originalAmount || item.amount || 0) -
                (item.usedAmount || 0);
            const priceCents = item.salePriceCents || 0;
            return remaining > 0 && priceCents > 0;
          })
          .map((item) => ({
            ...item,
            remainingAmount:
              item.remainingAmount ??
              Math.max(
                0,
                (item.originalAmount || item.amount || 0) -
                  (item.usedAmount || 0),
              ),
            amount:
              item.remainingAmount! ??
              Math.max(
                0,
                (item.originalAmount || item.amount || 0) -
                  (item.usedAmount || 0),
              ),
          }));

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

        setLoadingText(
          `Поиск комбинации для ${centsToStr(targetCents)} (${i + 1}/${totalCalculations})...`,
        );

        const solution = await findExactCombination(
          targetCents,
          availableItems,
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
              item.usedAmount = (item.usedAmount || 0) + solutionItem.quantity;
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
      const allHistory = [...usageHistory, ...newHistory];
      allHistory.forEach((calc, idx) => {
        if (calc) {
          calc.calculationNumber = idx + 1;
        }
      });

      setItems(updatedItems);
      setUsageHistory(allHistory);
      setFailedCalculations(failedCalcs);
      setItems(updatedItems);
      setUsageHistory(allHistory);

      if (failedCalcs.length > 0) {
        setShowNoSolutionModal(true);
      } else {
        setSumInput('');
      }
    } catch (error) {
      console.error('Error during calculation:', error);
      alert('Произошла ошибка при вычислении. Проверьте консоль для деталей.');
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  }, [sumInput, usageHistory, items, setItems, setUsageHistory]);

  const settings: SettingsSectionData[] = useMemo(() => {
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
    ];
  }, [firstRow, nameColumn, priceColumn, amountColumn]);

  const handleCloseNoSolutionModal = () => {
    setShowNoSolutionModal(false);
  };

  return {
    items,
    originalItems,
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
  };
};
