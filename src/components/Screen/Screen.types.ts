export interface ScreenProps {
  title?: string;
  children: React.ReactNode;
  showSettingsState: boolean;
  settingsState: React.ReactNode;
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}
