import {
  FileUploadButton,
  ProcessControls,
  usePageSwitcherNavigation,
} from '@components';
import { styles } from './UploadSection.styles';
import { UploadSectionProps } from './UploadSection.types';

export const UploadSection = ({
  fileUpload,
  isProcessDisabled,
  handleProcess,
  handleClear,
}: UploadSectionProps) => {
  const { goToNextPage } = usePageSwitcherNavigation();

  return (
    <div css={styles.container}>
      <div css={styles.content}>
        <div css={styles.uploadSection}>
          <FileUploadButton
            label={'Загрузите файл с ценами с остатками'}
            fileName={fileUpload.fileName}
            onFileSelect={fileUpload.handleFileChange}
            isFileReady={fileUpload.isReady}
          />
        </div>
        <ProcessControls
          isProcessDisabled={isProcessDisabled}
          handleProcess={handleProcess}
          handleClear={handleClear}
          handleSettings={goToNextPage}
        />
      </div>
    </div>
  );
};
