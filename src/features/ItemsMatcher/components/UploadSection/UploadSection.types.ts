import { File1C, FileFusion } from '@features/ItemsMatcher/ItemsMatcher.types';
import { FileUploadState } from '@hooks';

export interface UploadSectionProps {
  fileUpload1C: FileUploadState<File1C[]>;
  fileUploadFusion: FileUploadState<FileFusion[]>;
  isProcessDisabled: boolean;
  handleProcess: () => void;
  handleClear: () => void;
}
