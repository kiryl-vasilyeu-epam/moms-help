import { useTranslation } from 'react-i18next';
import { FileUploadButton, ProcessControls } from '@components';
import { styles } from './UploadSection.styles';
import { UploadSectionProps } from './UploadSection.types';

export const UploadSection = <T, P>({
  fileUpload1C,
  fileUploadFusion,
  isProcessDisabled,
  handleProcess,
  handleClear,
}: UploadSectionProps<T, P>) => {
  const { t } = useTranslation();

  return (
    <div css={styles.container}>
      <div css={styles.uploadSection}>
        <FileUploadButton
          label={t("itemsMatcher.files.file1CLabel")}
          fileName={fileUpload1C.fileName}
          onFileSelect={fileUpload1C.handleFileChange}
          isFileReady={fileUpload1C.isReady}
        />

        <FileUploadButton
          label={t("itemsMatcher.files.fileFusionLabel")}
          fileName={fileUploadFusion.fileName}
          onFileSelect={fileUploadFusion.handleFileChange}
          isFileReady={fileUploadFusion.isReady}
        />
      </div>
      <ProcessControls
        isProcessDisabled={isProcessDisabled}
        handleProcess={handleProcess}
        handleClear={handleClear}
        plural
      />
    </div>
  );
};
