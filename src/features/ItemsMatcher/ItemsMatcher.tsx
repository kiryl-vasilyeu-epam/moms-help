import { useTranslation } from 'react-i18next';
import { styles } from "./ItemsMatcher.styles";
import { 
  UploadSection, 
  Results 
} from './components';
import { useItemsMatcher } from './ItemsMatcher.hooks';
import { memo } from 'react';
import { ProcessControls } from '@components';

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
    isFiltering,
    fileFusionItems,
    handleSelectMatch,
    handleSelectMatchItem,
    handleRemoveMatch,
    dropdownAnchor,
    handleCloseDropdown,
  } = useItemsMatcher();

  return (
    <div css={styles.container}>
      <h1>{t("itemsMatcher.title")}</h1>
      
      <UploadSection 
        fileUpload1C={fileUpload1C}
        fileUploadFusion={fileUploadFusion}
      />

      <ProcessControls
        isProcessDisabled={isProcessDisabled}
        handleProcess={handleProcess}
        handleClear={handleClear}
        plural
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
        isFiltering={isFiltering}
        fileFusionItems={fileFusionItems}
        handleSelectMatch={handleSelectMatch}
        handleSelectMatchItem={handleSelectMatchItem}
        handleRemoveMatch={handleRemoveMatch}
        dropdownAnchor={dropdownAnchor}
        handleCloseDropdown={handleCloseDropdown}
      />
    </div>
  );
});

ItemsMatcher.displayName = 'ItemsMatcher';