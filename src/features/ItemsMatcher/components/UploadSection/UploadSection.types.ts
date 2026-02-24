export interface FileUploadState {
  fileName: string;
  handleFileChange: (file: File) => void;
  isReady: boolean;
}

export interface UploadSectionProps {
  fileUpload1C: FileUploadState;
  fileUploadFusion: FileUploadState;
}
