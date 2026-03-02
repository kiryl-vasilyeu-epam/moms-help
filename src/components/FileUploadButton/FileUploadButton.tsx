import { styles } from './FileUploadButton.styles';
import { useTranslation } from 'react-i18next';
import { FileUploadButtonProps } from './FileUploadButton.types';
import { useFileUploadButton } from './FileUploadButton.hooks';
import { Typography } from '../Typography';

export const FileUploadButton = ({
  label,
  fileName,
  onFileSelect,
  isFileReady,
}: FileUploadButtonProps) => {
  const { t } = useTranslation();
  const { handleFileInput, id } = useFileUploadButton({ onFileSelect, label });

  return (
    <div css={[styles.uploadBox, isFileReady && styles.loadedFileBox]}>
      <Typography
        variant="h3"
        style={[styles.uploadBoxH3, isFileReady && styles.loadedH3]}
      >
        {label}
      </Typography>
      <Typography variant="label" color="white" style={styles.fileLabel}>
        <label htmlFor={id}>{t('fileUpload.selectFile')}</label>
      </Typography>
      <input
        type="file"
        accept=".xls,.xlsx"
        css={styles.fileInput}
        onChange={handleFileInput}
        id={id}
      />
      <Typography variant="bodySmall" color="secondary" style={styles.fileName}>
        {fileName ?? t('fileUpload.fileNotSelected')}
      </Typography>
    </div>
  );
};
