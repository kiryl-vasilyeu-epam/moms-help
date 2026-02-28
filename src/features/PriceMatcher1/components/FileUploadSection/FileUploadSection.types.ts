export interface FileUploadSectionProps {
  fileName: string
  onFileChange: (file: File) => void
  onReset: () => void
  isDisabled: boolean
}
