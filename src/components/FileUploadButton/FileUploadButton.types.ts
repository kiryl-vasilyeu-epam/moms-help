export interface FileUploadButtonProps {
  label: string;
  onFileSelect: (file: File) => void;
  fileName?: string | null;
  isFileReady?: boolean;
}
