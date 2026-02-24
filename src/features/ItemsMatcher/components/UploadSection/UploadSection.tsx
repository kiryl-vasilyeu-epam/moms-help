import { useTranslation } from 'react-i18next';
import { FileUploadButton } from '@components';
import { styles } from './UploadSection.styles';
import { UploadSectionProps } from './UploadSection.types';

export const UploadSection = ({
  fileUpload1C,
  fileUploadFusion,
}: UploadSectionProps) => {
  const { t } = useTranslation();

  return (
    <div css={styles.uploadSection}>
      <FileUploadButton
        label={t("itemMatcher.file1Label")}
        fileName={fileUpload1C.fileName}
        onFileSelect={fileUpload1C.handleFileChange}
        isFileReady={fileUpload1C.isReady}
      />

      <FileUploadButton
        label={t("itemMatcher.file2Label")}
        fileName={fileUploadFusion.fileName}
        onFileSelect={fileUploadFusion.handleFileChange}
        isFileReady={fileUploadFusion.isReady}
      />
    </div>
  );
};
