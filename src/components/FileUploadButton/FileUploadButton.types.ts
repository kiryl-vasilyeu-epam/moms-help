export interface FileUploadButtonProps {
  label: string;
  onFileSelect: (file: File) => void
  fileName: string
  isFileReady?: boolean
}
