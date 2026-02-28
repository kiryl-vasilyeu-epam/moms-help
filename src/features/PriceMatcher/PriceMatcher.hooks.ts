import { useLocalStorage, useXLSFileUpload } from "@hooks";
import { useEffect, useState } from "react";
import { Calculation, FailedCalculation, PriceItem, TransferredItem } from "./PriceMatcher.types";
import { STORAGE_KEYS } from "@constants";
import { parseFile } from "./PriceMatcher.helpers";

export const usePriceMatcher = () => {
  const [items, setItems] = useState<PriceItem[]>([]);
  const [originalItems, setOriginalItems] = useState<PriceItem[]>([]);
  const [usageHistory, setUsageHistory] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [failedCalculations, setFailedCalculations] = useState<FailedCalculation[]>([]);
  const [showNoSolutionModal, setShowNoSolutionModal] = useState(false);
  const [storedItems, setStoredItems] = useLocalStorage<PriceItem[]>(
    STORAGE_KEYS.PRICE_MATCHER_ITEMS_KEY,
    []
  );
  const [storedOriginal, setStoredOriginal] = useLocalStorage<PriceItem[]>(
    STORAGE_KEYS.PRICE_MATCHER_ORIGINAL_ITEMS_KEY,
    []
  );
  const [storedHistory, setStoredHistory] = useLocalStorage<Calculation[]>(
    STORAGE_KEYS.PRICE_MATCHER_USAGE_HISTORY_KEY,
    []
  );
  const [transferredData, setTransferredData] = useLocalStorage<TransferredItem[] | null>(
    STORAGE_KEYS.PRICE_MATCHER_TRANSFER_DATA,
    null
  );

  const {
    fileName,
    handleFileChange,
    isReady: isFileReady,
    processFiles,
    clearFiles
  } = useXLSFileUpload<PriceItem[]>(parseFile);

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
      setStoredItems(convertedItems);
      setStoredOriginal(convertedItems.map((item) => ({ ...item })));
      setStoredHistory([]);
    } else if (storedItems && storedItems.length > 0) {
      setItems(storedItems);
      setOriginalItems(storedOriginal || []);
      setUsageHistory(storedHistory || []);
    }
  }, [setStoredHistory, setStoredItems, setStoredOriginal, storedHistory, storedItems, storedOriginal, transferredData]);
  
  const handleProcessFile = () => {
    const items = processFiles();
    if(!items) return;
    setItems(items);
  };
  const handleClearData = () => {
    clearFiles();
    setItems([]);
    setOriginalItems([]);
    setUsageHistory([]);
    setStoredItems([]);
    setStoredOriginal([]);
    setStoredHistory([]);
    setTransferredData(null);
  };

  return {
    handleProcessFile,
    handleFileChange,
    fileName,
    isFileReady,
    handleClearData
  };
};
