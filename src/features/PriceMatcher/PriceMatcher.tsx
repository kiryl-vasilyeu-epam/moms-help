import { FileUploadButton, ProcessControls, Screen } from '@components';
import { usePriceMatcher } from './PriceMatcher.hooks';
import { styles } from './PriceMatcher.styles';
// import { useTranslation } from 'react-i18next';

const PriceMatcher = () => {
  // const { t } = useTranslation();
  const {
    handleProcessFile,
    fileName,
    isFileReady,
    handleFileChange,
    handleClearData,
    items,
    // originalItems,
    // usageHistory,
  } = usePriceMatcher();

  return (
    <Screen
      title={'Совпадение цен'}
      showSettingsState={!items.length}
      settingsState={
        <div css={styles.controls}>
          <FileUploadButton
            label={'Загрузить XLS файл'}
            fileName={fileName}
            onFileSelect={handleFileChange}
            isFileReady={isFileReady}
          />

          <ProcessControls
            isProcessDisabled={!isFileReady}
            handleProcess={handleProcessFile}
            handleClear={handleClearData}
          />
        </div>
      }
    >
      asd
    </Screen>
  );
};

export default PriceMatcher;
