export interface ScreenProps {
  title?: string;
  children: React.ReactNode;
  showUploadState: boolean;
  uploadState: React.ReactNode;
  handleClear?: () => void;
}
