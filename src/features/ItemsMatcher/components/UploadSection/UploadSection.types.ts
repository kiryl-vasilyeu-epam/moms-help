import { FileUploadState } from "@hooks";

export interface UploadSectionProps<T, P> {
  fileUpload1C: FileUploadState<T>;
  fileUploadFusion: FileUploadState<P>;
  isProcessDisabled: boolean
  handleProcess: () => void;
  handleClear: () => void;
}
