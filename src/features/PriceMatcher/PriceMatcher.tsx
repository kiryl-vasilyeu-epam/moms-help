import { ListTable, PageSwitcher, Screen, SettingsSection } from '@components';
import { usePriceMatcher } from './PriceMatcher.hooks';
import { UploadSection } from './components/UploadSection';
import { DiscountInput } from './components';
import { COLUMNS_IDS, COLUMNS_WEIGHT } from './PriceMatcher.constants';
import { styles } from './PriceMatcher.styles';
import { TableCell } from './components/TableCell';
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
    // originalItems,
    // usageHistory,
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

        <ListTable
          itemHeight={80}
          headerLabels={[
            '#',
            'Наименование',
            'Цена',
            'Цена со скидкой',
            'Всего',
            'Использовано',
            'Остаток',
          ]}
          columnIds={COLUMNS_IDS}
          columnsWeight={COLUMNS_WEIGHT}
          items={items}
          CellComponent={TableCell}
          // getRowStyles={filterApplied ? undefined : getRowStyles}
          // cellCommonProps={{ handleRemoveMatch, handleSelectMatchItem }}
        />
      </div>
    </Screen>
  );
};

export default PriceMatcher;
