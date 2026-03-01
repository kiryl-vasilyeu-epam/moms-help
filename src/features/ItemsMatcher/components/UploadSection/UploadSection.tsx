import { useTranslation } from 'react-i18next';
import {
  FileUploadButton,
  ProcessControls,
  usePageSwitcherNavigation,
} from '@components';
import { styles } from './UploadSection.styles';
import { UploadSectionProps } from './UploadSection.types';

export const UploadSection = ({
  fileUpload1C,
  fileUploadFusion,
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
            label={t('itemsMatcher.files.file1CLabel')}
            fileName={fileUpload1C.fileName}
            onFileSelect={fileUpload1C.handleFileChange}
            isFileReady={fileUpload1C.isReady}
          />

          <FileUploadButton
            label={t('itemsMatcher.files.fileFusionLabel')}
            fileName={fileUploadFusion.fileName}
            onFileSelect={fileUploadFusion.handleFileChange}
            isFileReady={fileUploadFusion.isReady}
          />
        </div>
        <ProcessControls
          isProcessDisabled={isProcessDisabled}
          handleProcess={handleProcess}
          handleClear={handleClear}
          handleSettings={goToNextPage}
          plural
        />
      </div>
    </div>
  );
};
