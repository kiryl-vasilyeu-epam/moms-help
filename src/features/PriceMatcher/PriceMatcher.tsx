import { FileUploadButton, ProcessControls } from '@components';
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
  } = usePriceMatcher();

  return (
    <div css={styles.container}>
      <h1>{'Совпадение цен'}</h1>

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
      
      
      
    </div>
  );
};

export default PriceMatcher;
