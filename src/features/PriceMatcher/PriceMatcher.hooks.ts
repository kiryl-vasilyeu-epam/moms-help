import { useLocalStorage, useXLSFileUpload } from "@hooks";
import { useEffect } from "react";
import { Calculation, PriceItem, TransferredItem } from "./PriceMatcher.types";
import { STORAGE_KEYS } from "@constants";
import { parseFile } from "./PriceMatcher.helpers";

export const usePriceMatcher = () => {
  // const [loading, setLoading] = useState(false);
  // const [loadingText, setLoadingText] = useState('');
  // const [failedCalculations, setFailedCalculations] = useState<FailedCalculation[]>([]);
  // const [showNoSolutionModal, setShowNoSolutionModal] = useState(false);
  const [items, setItems] = useLocalStorage<PriceItem[]>(
    STORAGE_KEYS.PRICE_MATCHER_ITEMS_KEY,
    []
  );
  const [originalItems, setOriginalItems] = useLocalStorage<PriceItem[]>(
    STORAGE_KEYS.PRICE_MATCHER_ORIGINAL_ITEMS_KEY,
    []
  );
  const [usageHistory, setUsageHistory] = useLocalStorage<Calculation[]>(
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
    }
  }, [setItems, setOriginalItems, setUsageHistory, transferredData]);
  
  const handleProcessFile = () => {
    const items = processFiles();
    if(!items) return;
    setItems(items);
    setOriginalItems(items.map((item) => ({ ...item })));
    setUsageHistory([]);
  };
  const handleClearData = () => {
    clearFiles();
    setItems([]);
    setOriginalItems([]);
    setUsageHistory([]);
    setTransferredData(null);
  };

  return {
    items,
    originalItems,
    usageHistory,
    handleProcessFile,
    handleFileChange,
    fileName,
    isFileReady,
    handleClearData
  };
};
