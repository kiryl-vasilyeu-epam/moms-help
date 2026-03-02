import {
  FileUploadButton,
  ProcessControls,
  usePageSwitcherNavigation,
} from '@components';
import { styles } from './UploadSection.styles';
import { UploadSectionProps } from './UploadSection.types';
import { useTranslation } from 'react-i18next';

export const UploadSection = ({
  fileUpload,
  isProcessDisabled,
  handleProcess,
  handleClear,
}: UploadSectionProps) => {
  const { t } = useTranslation();
  const { goToNextPage } = usePageSwitcherNavigation();

  return (
    <div css={styles.container}>
      <div css={styles.content}>
        <div css={styles.uploadSection}>
          <FileUploadButton
            label={t('priceMatcher.uploadLabel')}
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
