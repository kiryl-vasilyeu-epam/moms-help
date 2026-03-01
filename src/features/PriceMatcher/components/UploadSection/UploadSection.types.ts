import { PriceItem } from '../../PriceMatcher.types';
import { FileUploadState } from '@hooks';

export interface UploadSectionProps {
  fileUpload: FileUploadState<PriceItem[]>;
  isProcessDisabled: boolean;
  handleProcess: () => void;
  handleClear: () => void;
}
