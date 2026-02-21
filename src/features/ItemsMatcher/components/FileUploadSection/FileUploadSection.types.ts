export interface FileUploadSectionProps {
  file1Name: string
  file2Name: string
  onFile1Change: (file: File) => void
  onFile2Change: (file: File) => void
}
