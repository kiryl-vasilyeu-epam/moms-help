import { styles } from "./FileUploadButton.styles"
import { useTranslation } from "react-i18next"
import { FileUploadButtonProps } from "./FileUploadButton.types"

export const FileUploadButton = ({ label, fileName }: FileUploadButtonProps) => {
  const { t } = useTranslation()
  const id = label.toLowerCase().replace(/\s+/g, '-') + "-file-input"

  return (
    <div css={styles.uploadBox}>
      <h3 css={styles.uploadBoxH3}>{label}</h3>
      <label
        htmlFor={id}
        css={styles.fileLabel}
      >{t("itemMatcher.selectFile")}</label>
      <input
        type="file"
        id={id}
        accept=".xls,.xlsx"
        css={styles.fileInput}
      />
      <div
        css={styles.fileName}
      >{fileName ? fileName : t("itemMatcher.fileNotSelected")}</div>
    </div>
                
  )
}