import { styles } from "./FileUploadButton.styles";
import { useTranslation } from "react-i18next";
import { FileUploadButtonProps } from "./FileUploadButton.types";
import { useFileUploadButton } from "./FileUploadButton.hooks";

export const FileUploadButton = ({ label, fileName, onFileSelect, isFileReady }: FileUploadButtonProps) => {
  const { t } = useTranslation();
  const { handleFileInput, id } = useFileUploadButton({ onFileSelect, label });

  return (
    <div css={[styles.uploadBox, isFileReady && styles.loadedFileBox]}>
      <h3 css={[styles.uploadBoxH3, isFileReady && styles.loadedH3]}>{label}</h3>
      <label
        css={styles.fileLabel}
        htmlFor={id}
      >{t("itemMatcher.selectFile")}</label>
      <input
        type="file"
        accept=".xls,.xlsx"
        css={styles.fileInput}
        onChange={handleFileInput}
        id={id}
      />
      <div
        css={styles.fileName}
      >{fileName ? fileName : t("itemMatcher.fileNotSelected")}</div>
    </div>
                
  );
};