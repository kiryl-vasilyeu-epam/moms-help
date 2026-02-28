export interface ProcessControlsProps {
  isProcessDisabled: boolean;
  handleProcess: () => void;
  handleClear: () => void;
  plural?: boolean;
}
