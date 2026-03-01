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
              onSave={() => null}
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
          <DialogContent>{loadingText ?? 'Загрузка...'}</DialogContent>
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
