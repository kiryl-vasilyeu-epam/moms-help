import { useTranslation } from 'react-i18next';
import { styles } from "./ItemsMatcher.styles";
import { FILTERS, STATS } from './ItemsMatcher.constants';
import { 
  UploadSection, 
  ProcessControls, 
  Results 
} from './components';
import { useItemsMatcher } from './ItemsMatcher.hooks';
import { memo } from 'react';

export const ItemsMatcher = memo(() => {
  const { t } = useTranslation();

  const {
    filteredItems,
    filterApplied,
    fileUpload1C,
    fileUploadFusion,
    isProcessDisabled,
    currentFilter,
    setCurrentFilter,
    showResults,
    handleProcess,
    handleClear,
    stats,
    handleDownload,
    handleTransfer,
  } = useItemsMatcher();

  return (
    <div css={styles.container}>
      <h1>{t("itemMatcher.title")}</h1>
      
      <UploadSection 
        fileUpload1C={fileUpload1C}
        fileUploadFusion={fileUploadFusion}
      />

      <ProcessControls 
        isProcessDisabled={isProcessDisabled}
        handleProcess={handleProcess}
        handleClear={handleClear}
      />

      <Results
        showResults={showResults}
        handleDownload={handleDownload}
        handleTransfer={handleTransfer}
        stats={stats}
        statsConfig={STATS}
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
        filtersConfig={FILTERS}
        filteredItems={filteredItems}
        filterApplied={filterApplied}
      />
    </div>
  );
});

ItemsMatcher.displayName = 'ItemsMatcher';