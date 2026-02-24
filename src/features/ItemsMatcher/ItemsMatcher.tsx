import { useTranslation } from 'react-i18next';
import { styles } from "./ItemsMatcher.styles";
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
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
        filteredItems={filteredItems}
        filterApplied={filterApplied}
      />
    </div>
  );
});

ItemsMatcher.displayName = 'ItemsMatcher';