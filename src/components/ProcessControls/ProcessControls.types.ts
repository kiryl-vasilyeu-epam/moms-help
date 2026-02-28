export interface ProcessControlsProps {
  isProcessDisabled: boolean;
  handleProcess: () => void;
  handleClear: () => void;
  handleSettings: () => void;
  plural?: boolean;
}
