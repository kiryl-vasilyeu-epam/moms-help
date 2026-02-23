import { FileUploadButtonProps } from "./FileUploadButton.types"
import { useCallback } from "react"

export const useFileUploadButton = ({ onFileSelect, label }: Pick<FileUploadButtonProps, 'onFileSelect' | 'label'>) => {
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
    e.target.value = ""
  }, [onFileSelect])
  const id = `file-upload-${label}`

  return {
    handleFileInput,
    id,
  }
}
