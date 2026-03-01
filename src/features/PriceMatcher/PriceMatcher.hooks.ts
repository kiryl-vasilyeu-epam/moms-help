import { useLocalStorage, useXLSFileUpload } from '@hooks';
import { useEffect, useMemo, useState } from 'react';
import { Calculation, PriceItem, TransferredItem } from './PriceMatcher.types';
import { STORAGE_KEYS } from '@constants';
import { parseFile } from './PriceMatcher.helpers';
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
  // const [loading, setLoading] = useState(false);
  // const [loadingText, setLoadingText] = useState('');
  // const [failedCalculations, setFailedCalculations] = useState<FailedCalculation[]>([]);
  // const [showNoSolutionModal, setShowNoSolutionModal] = useState(false);
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
  };
};
