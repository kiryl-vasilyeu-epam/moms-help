import { stylesheet } from './FileUploadButton.styles';
import { useTranslation } from 'react-i18next';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
  const {
    handleFileInput,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isDragging,
    id,
  } = useFileUploadButton({ onFileSelect, label });
  const styles = useStyles(stylesheet);
  const Icon = isFileReady ? CheckCircleOutlineIcon : UploadFileOutlinedIcon;

  return (
    <label
      htmlFor={id}
      css={[
        styles.uploadBox,
        isDragging && styles.dragging,
        isFileReady && styles.loadedFileBox,
      ]}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Icon css={[styles.icon, isFileReady && styles.loadedIcon]} />
      <Typography variant="h3" style={styles.uploadBoxH3}>
        {label}
      </Typography>
      <Typography
        variant="bodySmall"
        style={[styles.fileName, !!isFileReady && styles.loadedFileName]}
      >
        {fileName ?? t('fileUpload.dropHint')}
      </Typography>
      <Typography variant="label" style={styles.fileLabel}>
        {isFileReady ? t('fileUpload.changeFile') : t('fileUpload.selectFile')}
      </Typography>
      <input
        type="file"
        accept=".xls,.xlsx"
        css={styles.fileInput}
        onChange={handleFileInput}
        id={id}
      />
    </label>
  );
};
