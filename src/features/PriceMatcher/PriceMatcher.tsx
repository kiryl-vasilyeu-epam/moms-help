import {
  ListTable,
  PageSwitcher,
  Screen,
  SettingsSection,
  Typography,
} from '@components';
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
import { COLUMNS_IDS, COLUMNS_WEIGHT } from './PriceMatcher.constants';
import { styles } from './PriceMatcher.styles';
import ResultsSection from './components/ResultsSection';
import { useTranslation } from 'react-i18next';

const PriceMatcher = () => {
  const { t } = useTranslation();
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
    onDiscountRecalculate,
  } = usePriceMatcher();

  return (
    <Screen
      title={t('priceMatcher.title')}
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
          onRecalculate={onDiscountRecalculate}
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
          headerLabels={[
            t('priceMatcher.tableHeaders.number'),
            t('priceMatcher.tableHeaders.name'),
            t('priceMatcher.tableHeaders.price'),
            t('priceMatcher.tableHeaders.discountPrice'),
            t('priceMatcher.tableHeaders.quantity'),
            t('priceMatcher.tableHeaders.used'),
            t('priceMatcher.tableHeaders.remaining'),
          ]}
          columnIds={COLUMNS_IDS}
          columnsWeight={COLUMNS_WEIGHT}
          items={items}
          CellComponent={TableCell}
        />

        <Dialog fullWidth open={loading}>
          <DialogTitle css={styles.loadingTitle}>
            <CircularProgress size="30px" />
            {t('common.pleaseWait')}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body">
              {loadingText.title ?? t('common.loading')}
            </Typography>
            {loadingText.details && (
              <Typography variant="bodySmall" style={styles.loadingDetails}>
                {loadingText.details}
              </Typography>
            )}
            {loadingText.variants && (
              <Typography variant="bodySmall" style={styles.loadingDetails}>
                {loadingText.variants}
              </Typography>
            )}
            {loadingText.time && (
              <Typography variant="bodySmall" style={styles.loadingDetails}>
                {t('common.time', { time: loadingText.time })}
              </Typography>
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
