import {
  useState,
  useCallback,
  useEffect,
  useTransition,
  useMemo,
} from 'react';
import { useLocalStorage } from '@hooks';
import { CONFIRMATION_MESSAGES } from './ItemsMatcher.constants';
import type {
  FilterType,
  MatchedItem,
  FileFusion,
  File1C,
  NewMatchData,
  ItemsMatcherData,
} from './ItemsMatcher.types';
import { STORAGE_KEYS } from '@constants';
import {
  exportToXLS,
  getStats,
  matchItems,
  parse1C,
  parseFusion,
} from './ItemsMatcher.helpers';
import { useXLSFileUpload } from '@hooks';
import {
  SaveDataInput,
  SaveDataOrder,
  SettingsSectionData,
  useScreen,
} from '@components';
import { SaveDataItem } from '@components';

export const SETTINGS_IDS = {
  POSSIBLE_1C_DATA_START: 'possible1CDataStart',
  FIRST_ROW_1C: 'firstRow1C',
  NAME_COLUMN_1C: 'nameColumn1C',
  PRICE_COLUMN_1C: 'priceColumn1C',
  AMOUNT_1C: 'amount1C',
  FIRST_ROW_FUSION: 'firstRowFusion',
  BARCODE_COLUMN_FUSION: 'barcodeColumnFusion',
  NAME_COLUMN_FUSION: 'nameColumnFusion',
  PRICE_COLUMN_FUSION: 'priceColumnFusion',
  EXPORT_COLUMNS_NAMES: 'exportColumnsNames',
  ITEMS_MATCHER_EXPORT_DATA_ORDER: 'itemsMatcherExportDataOrder',
};

export const useFilesSettings = () => {
  const [possible1CDataStart, setPossible1CDataStart] = useLocalStorage<string>(
    STORAGE_KEYS.POSSIBLE_1C_DATA_START,
    'ТТН, ТН, Счет-фактура',
  );
  const [firstRow1C, setFirstRow1C] = useLocalStorage<number>(
    STORAGE_KEYS.FIRST_ROW_1C,
    1,
  );
  const [nameColumn1C, setNameColumn1C] = useLocalStorage<number>(
    STORAGE_KEYS.NAME_COLUMN_1C,
    0,
  );
  const [priceColumn1C, setPriceColumn1C] = useLocalStorage<number>(
    STORAGE_KEYS.PRICE_COLUMN_1C,
    2,
  );
  const [amount1C, setAmount1C] = useLocalStorage<number>(
    STORAGE_KEYS.AMOUNT_1C,
    3,
  );
  const [firstRowFusion, setFirstRowFusion] = useLocalStorage<number>(
    STORAGE_KEYS.FIRST_ROW_FUSION,
    1,
  );
  const [barcodeColumnFusion, setBarcodeColumnFusion] = useLocalStorage<number>(
    STORAGE_KEYS.BARCODE_COLUMN_FUSION,
    0,
  );
  const [nameColumnFusion, setNameColumnFusion] = useLocalStorage<number>(
    STORAGE_KEYS.NAME_COLUMN_FUSION,
    1,
  );
  const [priceColumnFusion, setPriceColumnFusion] = useLocalStorage<number>(
    STORAGE_KEYS.PRICE_COLUMN_FUSION,
    2,
  );
  const [exportColumnsNames, setExportColumnsNames] = useLocalStorage<string>(
    STORAGE_KEYS.EXPORT_COLUMNS_NAMES,
    'Наименование, Цена розничная, Цена со скидкой, Кол-во, Себестоимость, Штрихкод',
  );
  const [itemsMatcherExportDataOrder, setItemsMatcherExportDataOrder] =
    useLocalStorage<string>(
      STORAGE_KEYS.ITEMS_MATCHER_EXPORT_DATA_ORDER,
      'name, retailPrice, discountPrice, amount, latestPrice, barcode',
    );

  return {
    possible1CDataStart,
    setPossible1CDataStart,
    firstRow1C,
    setFirstRow1C,
    nameColumn1C,
    setNameColumn1C,
    priceColumn1C,
    setPriceColumn1C,
    amount1C,
    setAmount1C,
    firstRowFusion,
    setFirstRowFusion,
    barcodeColumnFusion,
    setBarcodeColumnFusion,
    nameColumnFusion,
    setNameColumnFusion,
    priceColumnFusion,
    setPriceColumnFusion,
    exportColumnsNames,
    setExportColumnsNames,
    itemsMatcherExportDataOrder,
    setItemsMatcherExportDataOrder,
  };
};

export const useItemsMatcher = (): ItemsMatcherData => {
  const { isModalOpen, openModal, closeModal } = useScreen();
  const fileUpload1C = useXLSFileUpload<File1C[]>();
  const fileUploadFusion = useXLSFileUpload<FileFusion[]>();
  const [allResults, setAllResults] = useLocalStorage<MatchedItem[]>(
    STORAGE_KEYS.ITEMS_MATCHER_RESULTS,
    [],
  );
  const [fileFusionItems, setFileFusionItems] = useLocalStorage<FileFusion[]>(
    STORAGE_KEYS.ITEMS_MATCHER_FILE_FUSION_ITEMS,
    [],
  );
  const [currentFilter, setCurrentFilterState] = useLocalStorage<FilterType>(
    STORAGE_KEYS.ITEMS_MATCHER_FILTER,
    'all',
  );
  const [filteredItems, setFilteredItems] = useState<MatchedItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [dropdownAnchor, setDropdownAnchor] = useState<HTMLElement | null>(
    null,
  );
  const [matchItem, setMatchItem] = useState<number | null>(null);
  const [isFiltering, startFilterTransition] = useTransition();

  useEffect(() => {
    if (allResults.length > 0) {
      setShowResults(true);
    }
  }, [allResults]);

  const filterApplied = currentFilter !== 'all';

  useEffect(() => {
    setFilteredItems(
      currentFilter === 'all'
        ? allResults
        : allResults.filter((item) => item.matchType === currentFilter),
    );
  }, [allResults, currentFilter]);

  const {
    possible1CDataStart,
    setPossible1CDataStart,
    firstRow1C,
    setFirstRow1C,
    nameColumn1C,
    setNameColumn1C,
    priceColumn1C,
    setPriceColumn1C,
    amount1C,
    setAmount1C,
    firstRowFusion,
    setFirstRowFusion,
    barcodeColumnFusion,
    setBarcodeColumnFusion,
    nameColumnFusion,
    setNameColumnFusion,
    priceColumnFusion,
    setPriceColumnFusion,
    exportColumnsNames,
    setExportColumnsNames,
    itemsMatcherExportDataOrder,
    setItemsMatcherExportDataOrder,
  } = useFilesSettings();

  const handleProcess = useCallback(() => {
    const items1C = fileUpload1C.processFiles(parse1C, {
      possible1CDataStart: possible1CDataStart.split(',').map((s) => s.trim()),
      firstRow1C,
      nameColumn1C,
      priceColumn1C,
      amount1C,
    });
    const itemsFusion = fileUploadFusion.processFiles(parseFusion, {
      firstRowFusion,
      barcodeColumnFusion,
      nameColumnFusion,
      priceColumnFusion,
    });
    if (items1C && itemsFusion) {
      const matchedItems = matchItems(items1C, itemsFusion);
      setAllResults(matchedItems);
      setFileFusionItems(itemsFusion);
      setShowResults(true);
      closeModal();
    }
  }, [
    fileUpload1C,
    possible1CDataStart,
    firstRow1C,
    nameColumn1C,
    priceColumn1C,
    amount1C,
    fileUploadFusion,
    firstRowFusion,
    barcodeColumnFusion,
    nameColumnFusion,
    priceColumnFusion,
    setAllResults,
    setFileFusionItems,
    closeModal,
  ]);

  const setCurrentFilter = useCallback(
    (filter: FilterType) => {
      startFilterTransition(() => {
        setCurrentFilterState(filter);
      });
    },
    [setCurrentFilterState],
  );

  const handleClear = useCallback(() => {
    if (confirm(CONFIRMATION_MESSAGES.clear)) {
      fileUpload1C.clearFiles();
      fileUploadFusion.clearFiles();
      setAllResults([]);
      setFileFusionItems([]);
      setShowResults(false);
      setCurrentFilter('all');
      closeModal();
    }
  }, [
    closeModal,
    fileUpload1C,
    fileUploadFusion,
    setAllResults,
    setCurrentFilter,
    setFileFusionItems,
  ]);

  const handleSelectMatchItem = useCallback(
    ({ anchor, itemIndex }: NewMatchData) => {
      setDropdownAnchor(anchor);
      setMatchItem(itemIndex);
    },
    [],
  );

  const handleSelectMatch = useCallback(
    (index: number) => {
      setDropdownAnchor(null);

      if (matchItem === null) return;
      const itemMatch = fileFusionItems[index];
      const updated = [...allResults];
      const currentItem = filteredItems[matchItem];
      const currentIndex = updated.indexOf(currentItem);
      updated[currentIndex] = {
        ...updated[currentIndex],
        matchType: 'manual',
        matchedInvNo: itemMatch.invNo,
        matchedItem: itemMatch,
      };

      setAllResults(updated);
    },
    [allResults, fileFusionItems, filteredItems, matchItem, setAllResults],
  );

  const handleCloseDropdown = useCallback(() => {
    setDropdownAnchor(null);
    setMatchItem(null);
  }, []);

  const handleRemoveMatch = useCallback(
    (itemIndex: number) => {
      const updated = [...allResults];
      if (
        updated[itemIndex].matchType === 'fuzzy' ||
        updated[itemIndex].matchType === 'manual'
      ) {
        updated[itemIndex] = {
          ...updated[itemIndex],
          matchType: 'none',
          matchedInvNo: null,
          matchedItem: null,
        };
        setAllResults(updated);
      }
    },
    [allResults, setAllResults],
  );

  const isProcessDisabled = !fileUpload1C.isReady || !fileUploadFusion.isReady;

  const [, setTransferData] = useLocalStorage<Record<string, unknown>>(
    STORAGE_KEYS.PRICE_MATCHER_TRANSFER_DATA,
    {},
  );

  const handleDownload = useCallback(() => {
    if (allResults.length === 0) {
      alert(CONFIRMATION_MESSAGES.noData);
      return;
    }
    exportToXLS(allResults, {
      exportColumnsNames: exportColumnsNames.split(',').map((s) => s.trim()),
      itemsMatcherExportDataOrder: itemsMatcherExportDataOrder
        .split(',')
        .map((s) => s.trim()),
    });
  }, [allResults, exportColumnsNames, itemsMatcherExportDataOrder]);

  const handleTransfer = useCallback(() => {
    if (allResults.length === 0) {
      alert(CONFIRMATION_MESSAGES.noDataTransfer);
      return;
    }

    const priceMatcherData = {
      items: allResults.map((item) => ({
        name: item.rawInvNoName ?? `${item.invNo} ${item.name}`,
        amount: Math.round(item.totalAmount),
        price: item.latestPrice,
        matched: item.matchType !== 'none',
      })),
      timestamp: new Date().toISOString(),
    };

    setTransferData(priceMatcherData);
    alert('✓ Данные переданы в "Поиск цен"');
  }, [allResults, setTransferData]);

  const stats = useMemo(() => getStats(allResults), [allResults]);

  const settings: SettingsSectionData[] = useMemo(() => {
    const exportColumnsNamesArray = exportColumnsNames
      .split(',')
      .map((label) => label.trim());
    const itemsMatcherExportDataOrderArray = itemsMatcherExportDataOrder
      .split(',')
      .map((label, index) => ({
        id: label.trim(),
        label: label.trim(),
        withInput: true,
        inputValue: exportColumnsNamesArray[index],
      }));

    return [
      {
        id: '1c',
        title: 'Файл 1С',
        settings: [
          {
            id: SETTINGS_IDS.POSSIBLE_1C_DATA_START,
            type: 'input',
            label: 'Возможные начала данных 1С (через запятую)',
            value: possible1CDataStart,
          },
          {
            id: SETTINGS_IDS.FIRST_ROW_1C,
            type: 'input',
            label: 'Номер первой строки с данными 1С',
            value: String(firstRow1C + 1),
          },
          {
            id: SETTINGS_IDS.NAME_COLUMN_1C,
            type: 'input',
            label: 'Номер колонки с наименованием в 1С',
            value: String(nameColumn1C + 1),
          },
          {
            id: SETTINGS_IDS.PRICE_COLUMN_1C,
            type: 'input',
            label: 'Номер колонки с ценой в 1С',
            value: String(priceColumn1C + 1),
          },
          {
            id: SETTINGS_IDS.AMOUNT_1C,
            type: 'input',
            label: 'Номер колонки с количеством в 1С',
            value: String(amount1C + 1),
          },
        ],
      },
      {
        id: 'fusion',
        title: 'Файл Fusion',
        settings: [
          {
            id: SETTINGS_IDS.FIRST_ROW_FUSION,
            type: 'input',
            label: 'Номер первой строки с данными Fusion',
            value: String(firstRowFusion + 1),
          },
          {
            id: SETTINGS_IDS.BARCODE_COLUMN_FUSION,
            type: 'input',
            label: 'Номер колонки со штрихкодом в Fusion',
            value: String(barcodeColumnFusion + 1),
          },
          {
            id: SETTINGS_IDS.NAME_COLUMN_FUSION,
            type: 'input',
            label: 'Номер колонки с наименованием в Fusion',
            value: String(nameColumnFusion + 1),
          },
          {
            id: SETTINGS_IDS.PRICE_COLUMN_FUSION,
            type: 'input',
            label: 'Номер колонки с ценой в Fusion',
            value: String(priceColumnFusion + 1),
          },
        ],
      },
      {
        id: 'export',
        title: 'Экспорт',
        settings: [
          {
            id: SETTINGS_IDS.ITEMS_MATCHER_EXPORT_DATA_ORDER,
            type: 'order',
            label: 'Порядок данных при экспорте',
            items: itemsMatcherExportDataOrderArray,
          },
        ],
      },
    ];
  }, [
    amount1C,
    barcodeColumnFusion,
    exportColumnsNames,
    firstRow1C,
    firstRowFusion,
    itemsMatcherExportDataOrder,
    nameColumn1C,
    nameColumnFusion,
    possible1CDataStart,
    priceColumn1C,
    priceColumnFusion,
  ]);

  const onSettingsSave = useCallback(
    (data: SaveDataItem[]) => {
      data.forEach((item) => {
        switch (item.id) {
          case SETTINGS_IDS.POSSIBLE_1C_DATA_START:
            setPossible1CDataStart((item as SaveDataInput).value);
            break;
          case SETTINGS_IDS.FIRST_ROW_1C:
            setFirstRow1C(Number((item as SaveDataInput).value) - 1);
            break;
          case SETTINGS_IDS.NAME_COLUMN_1C:
            setNameColumn1C(Number((item as SaveDataInput).value) - 1);
            break;
          case SETTINGS_IDS.PRICE_COLUMN_1C:
            setPriceColumn1C(Number((item as SaveDataInput).value) - 1);
            break;
          case SETTINGS_IDS.AMOUNT_1C:
            setAmount1C(Number((item as SaveDataInput).value) - 1);
            break;
          case SETTINGS_IDS.FIRST_ROW_FUSION:
            setFirstRowFusion(Number((item as SaveDataInput).value) - 1);
            break;
          case SETTINGS_IDS.BARCODE_COLUMN_FUSION:
            setBarcodeColumnFusion(Number((item as SaveDataInput).value) - 1);
            break;
          case SETTINGS_IDS.NAME_COLUMN_FUSION:
            setNameColumnFusion(Number((item as SaveDataInput).value) - 1);
            break;
          case SETTINGS_IDS.PRICE_COLUMN_FUSION:
            setPriceColumnFusion(Number((item as SaveDataInput).value) - 1);
            break;
          case SETTINGS_IDS.ITEMS_MATCHER_EXPORT_DATA_ORDER: {
            const order = (item as SaveDataOrder).items;
            const [exportDataOrder, exportColumnsNames] = order.reduce<
              [string[], string[]]
            >(
              (acc, curr) => {
                acc[0].push(curr.id);
                acc[1].push(curr.inputValue ?? '');
                return acc;
              },
              [[], []],
            );
            setExportColumnsNames(
              exportColumnsNames.map((s) => s.trim()).join(', '),
            );
            setItemsMatcherExportDataOrder(
              exportDataOrder.map((s) => s.trim()).join(', '),
            );
            break;
          }
        }
      });
    },
    [
      setAmount1C,
      setBarcodeColumnFusion,
      setExportColumnsNames,
      setFirstRow1C,
      setFirstRowFusion,
      setItemsMatcherExportDataOrder,
      setNameColumn1C,
      setNameColumnFusion,
      setPossible1CDataStart,
      setPriceColumn1C,
      setPriceColumnFusion,
    ],
  );

  return {
    fileUpload1C,
    fileUploadFusion,
    isProcessDisabled,
    allResults,
    filteredItems,
    filterApplied,
    fileFusionItems,
    currentFilter,
    setCurrentFilter,
    showResults,
    setShowResults,
    handleProcess,
    handleClear,
    handleSelectMatchItem,
    handleSelectMatch,
    handleRemoveMatch,
    handleCloseDropdown,
    stats,
    handleDownload,
    handleTransfer,
    isFiltering,
    dropdownAnchor,
    isModalOpen,
    openModal,
    closeModal,
    settings,
    onSettingsSave,
  };
};
