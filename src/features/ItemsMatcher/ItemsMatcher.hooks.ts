import { useState, useCallback, useEffect, useTransition } from 'react';
import { useLocalStorage } from '@hooks';
import { CONFIRMATION_MESSAGES } from './ItemsMatcher.constants';
import type { FilterType, MatchedItem, FileFusion, File1C } from './ItemsMatcher.types';
import { STORAGE_KEYS } from '@constants';
import { exportToXLS, getStats, matchItems, parse1C, parseFusion } from './ItemsMatcher.helpers';
import { useXLSFileUpload } from '@hooks';

export const useItemsMatcher = () => {
  const fileUpload1C = useXLSFileUpload<File1C[]>(parse1C);
  const fileUploadFusion = useXLSFileUpload<FileFusion[]>(parseFusion);
  const [allResults, setAllResults] = useLocalStorage<MatchedItem[]>(
    STORAGE_KEYS.ITEMS_MATCHER_RESULTS,
    []
  );
  const [fileFusionItems, setFileFusionItems] = useLocalStorage<FileFusion[]>(
    STORAGE_KEYS.ITEMS_MATCHER_FILE_FUSION_ITEMS,
    []
  );
  const [currentFilter, setCurrentFilterState] = useLocalStorage<FilterType>(
    STORAGE_KEYS.ITEMS_MATCHER_FILTER,
    'all'
  );
  const [filteredItems, setFilteredItems] = useState<MatchedItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
        : allResults.filter((item) => item.matchType === currentFilter));
  }, [allResults, currentFilter]);

  const handleProcess = useCallback(() => {
    const items1C = fileUpload1C.processFiles();
    const itemsFusion = fileUploadFusion.processFiles();
    if (items1C && itemsFusion) {
      const matchedItems = matchItems(items1C, itemsFusion);
      setAllResults(matchedItems);
      setFileFusionItems(itemsFusion);
      setShowResults(true);
    }
  }, [fileUpload1C, fileUploadFusion, setAllResults, setFileFusionItems]);

  const setCurrentFilter = useCallback((filter: FilterType) => {
    startFilterTransition(() => {
      setCurrentFilterState(filter);
    });
  }, [setCurrentFilterState]);

  const handleClear = useCallback(() => {
    if (confirm(CONFIRMATION_MESSAGES.clear)) {
      fileUpload1C.clearFiles();
      fileUploadFusion.clearFiles();
      setAllResults([]);
      setFileFusionItems([]);
      setShowResults(false);
      setCurrentFilter('all');
    }
  }, [fileUpload1C, fileUploadFusion, setAllResults, setCurrentFilter, setFileFusionItems]);

  const handleSelectMatch = useCallback((itemIndex: number) => {
    setSelectedItemIndex(itemIndex);
    setDropdownOpen(true);
  }, []);

  const handleSelectMatchItem = useCallback(
    (file2Index: number) => {
      if (selectedItemIndex === null) return;

      const itemMatch = fileFusionItems[file2Index];
      const updated = [...allResults];
      updated[selectedItemIndex] = {
        ...updated[selectedItemIndex],
        matchType: 'manual',
        matchedInvNo: itemMatch.invNo,
        matchedItem: itemMatch
      };

      setAllResults(updated);
      setSelectedItemIndex(null);
      setDropdownOpen(false);
    },
    [selectedItemIndex, allResults, fileFusionItems, setAllResults]
  );

  const handleUnmatchItem = useCallback(
    (itemIndex: number) => {
      const updated = [...allResults];
      if (updated[itemIndex].matchType === 'fuzzy' || updated[itemIndex].matchType === 'manual') {
        updated[itemIndex] = {
          ...updated[itemIndex],
          matchType: 'none',
          matchedInvNo: null,
          matchedItem: null
        };
        setAllResults(updated);
      }
    },
    [allResults, setAllResults]
  );

  const isProcessDisabled = !fileUpload1C.isReady || !fileUploadFusion.isReady;

  const [, setTransferData] = useLocalStorage<Record<string, unknown>>(
    STORAGE_KEYS.PRICE_MATCHER_TRANSFER_DATA,
    {}
  );
  
  const handleDownload = useCallback(() => {
    if (allResults.length === 0) {
      alert(CONFIRMATION_MESSAGES.noData);
      return;
    }
    exportToXLS(allResults);
  }, [allResults]);
  
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
        matched: item.matchType !== 'none'
      })),
      timestamp: new Date().toISOString()
    };
  
    setTransferData(priceMatcherData);
    alert('✓ Данные переданы в "Поиск цен"');
  }, [allResults, setTransferData]);

  return {
    fileUpload1C,
    fileUploadFusion,
    isProcessDisabled,
    allResults,
    filteredItems,
    filterApplied,
    setAllResults,
    fileFusionItems,
    setFileFusionItems,
    currentFilter,
    setCurrentFilter,
    showResults,
    setShowResults,
    selectedItemIndex,
    setSelectedItemIndex,
    dropdownOpen,
    setDropdownOpen,
    handleProcess,
    handleClear,
    handleSelectMatch,
    handleSelectMatchItem,
    handleUnmatchItem,
    stats: getStats(allResults),
    handleDownload,
    handleTransfer,
    isFiltering,
  };
};
