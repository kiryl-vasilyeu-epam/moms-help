import { useTranslation } from 'react-i18next';
import { UploadSection, Results } from './components';
import { useItemsMatcher } from './ItemsMatcher.hooks';
import { memo } from 'react';
import { PageSwitcher, Screen, SettingsSection } from '@components';

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
    isModalOpen,
    openModal,
    closeModal,
    settings,
    onSettingsSave,
  } = useItemsMatcher();

  return (
    <Screen
      title={t('itemsMatcher.title')}
      showSettingsState={!showResults}
      isModalOpen={isModalOpen}
      openModal={openModal}
      closeModal={closeModal}
      settingsState={
        <PageSwitcher
          initialPageIndex={0}
          pages={[
            <UploadSection
              key="upload"
              fileUpload1C={fileUpload1C}
              fileUploadFusion={fileUploadFusion}
              isProcessDisabled={isProcessDisabled}
              handleProcess={handleProcess}
              handleClear={handleClear}
            />,
            <SettingsSection
              key="settings"
              sections={settings}
              onSave={onSettingsSave}
            />,
          ]}
        />
      }
    >
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
    </Screen>
  );
});

ItemsMatcher.displayName = 'ItemsMatcher';
