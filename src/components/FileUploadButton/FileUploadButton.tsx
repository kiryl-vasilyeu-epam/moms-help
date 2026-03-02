import { stylesheet } from './FileUploadButton.styles';
import { useTranslation } from 'react-i18next';
import { FileUploadButtonProps } from './FileUploadButton.types';
import { useFileUploadButton } from './FileUploadButton.hooks';
import { Typography } from '../Typography';
import { useStyles } from '@hooks';

export const FileUploadButton = ({
  label,
  fileName,
  onFileSelect,
  isFileReady,
}: FileUploadButtonProps) => {
  const { t } = useTranslation();
  const { handleFileInput, id } = useFileUploadButton({ onFileSelect, label });
  const styles = useStyles(stylesheet);

  return (
    <div css={[styles.uploadBox, isFileReady && styles.loadedFileBox]}>
      <Typography
        variant="h3"
        style={[styles.uploadBoxH3, !!isFileReady && styles.loadedH3]}
      >
        {label}
      </Typography>
      <label htmlFor={id}>
        <Typography variant="label" color="white" style={styles.fileLabel}>
          {t('fileUpload.selectFile')}
        </Typography>
      </label>
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
