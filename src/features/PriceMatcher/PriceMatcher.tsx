import { ListTable, PageSwitcher, Screen, SettingsSection } from '@components';
import { usePriceMatcher } from './PriceMatcher.hooks';
import {
  DialogContent,
  Dialog,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import {
  DiscountInput,
  TableCell,
  UploadSection,
  PricesInput,
  NoSolutionModal,
} from './components';
import {
  COLUMN_HEADERS,
  COLUMNS_IDS,
  COLUMNS_WEIGHT,
} from './PriceMatcher.constants';
import { styles } from './PriceMatcher.styles';
import ResultsSection from './components/ResultsSection';
// import { useTranslation } from 'react-i18next';

const PriceMatcher = () => {
  // const { t } = useTranslation();
  const {
    fileUpload,
    items,
    isModalOpen,
    openModal,
    closeModal,
    handleProcessFile,
    handleClearData,
    settings,
    discountPercent,
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
    usageHistory,
    handleRemoveCalculation,
    handleExportRemainingItems,
    onSettingsSave,
    handleExportCalculations,
  } = usePriceMatcher();

  return (
    <Screen
      title={'Совпадение цен'}
      showSettingsState={!items.length}
      isModalOpen={isModalOpen}
      openModal={openModal}
      closeModal={closeModal}
      settingsState={
        <PageSwitcher
          initialPageIndex={0}
          pages={[
            <UploadSection
              key="upload"
              fileUpload={fileUpload}
              isProcessDisabled={!fileUpload.isReady}
              handleProcess={handleProcessFile}
              handleClear={handleClearData}
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
      <div css={styles.container}>
        <DiscountInput
          discountPercent={discountPercent}
          discountInputValue={discountInputValue}
          setDiscountInputValue={setDiscountInputValue}
        />

        <PricesInput
          prices={sumInput}
          setPrices={setSumInput}
          handleCalculate={handleCalculate}
        />

        {usageHistory.length > 0 && (
          <ResultsSection
            usageHistory={usageHistory}
            items={items}
            onRemoveCalculation={handleRemoveCalculation}
            onExportRemainingItems={handleExportRemainingItems}
            onExportCalculations={handleExportCalculations}
          />
        )}

        <ListTable
          itemHeight={80}
          headerLabels={COLUMN_HEADERS}
          columnIds={COLUMNS_IDS}
          columnsWeight={COLUMNS_WEIGHT}
          items={items}
          CellComponent={TableCell}
        />

        <Dialog fullWidth open={loading}>
          <DialogTitle css={styles.loadingTitle}>
            <CircularProgress size="30px" />
            Пожалуйста, подождите
          </DialogTitle>
          <DialogContent>
            {loadingText.title ?? 'Загрузка...'}
            {loadingText.details && (
              <span css={styles.loadingDetails}>{loadingText.details}</span>
            )}
            {loadingText.variants && (
              <span css={styles.loadingDetails}>{loadingText.variants}</span>
            )}
            {loadingText.time && (
              <span css={styles.loadingDetails}>Время: {loadingText.time}</span>
            )}
          </DialogContent>
        </Dialog>

        <NoSolutionModal
          open={showNoSolutionModal}
          onClose={handleCloseNoSolutionModal}
          failedCalculations={failedCalculations}
        />
      </div>
    </Screen>
  );
};

export default PriceMatcher;
