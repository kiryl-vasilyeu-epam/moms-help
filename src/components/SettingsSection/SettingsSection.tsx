import {
  Button,
  Settings,
  SettingsProps,
  usePageSwitcherNavigation,
} from '@components';
import { styles } from './SettingsSection.styles';

export const SettingsSection = ({ sections, onSave }: SettingsProps) => {
  const { goToPrevPage } = usePageSwitcherNavigation();
  const onSaveHandler: SettingsProps['onSave'] = (data) => {
    onSave(data);
    goToPrevPage();
  };
  return (
    <div style={styles.container}>
      <Button variant="info" onClick={goToPrevPage} style={styles.back}>
        Назад без сохранения
      </Button>
      <Settings sections={sections} onSave={onSaveHandler} />
    </div>
  );
};
