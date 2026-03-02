import {
  Button,
  Settings,
  SettingsProps,
  usePageSwitcherNavigation,
} from '@components';
import { styles } from './SettingsSection.styles';
import { useTranslation } from 'react-i18next';

export const SettingsSection = ({ sections, onSave }: SettingsProps) => {
  const { t } = useTranslation();
  const { goToPrevPage } = usePageSwitcherNavigation();
  const onSaveHandler: SettingsProps['onSave'] = (data) => {
    onSave(data);
    goToPrevPage();
  };
  return (
    <div css={styles.container}>
      <Button variant="info" onClick={goToPrevPage} style={styles.back}>
        {t('common.backWithoutSaving')}
      </Button>
      <Settings sections={sections} onSave={onSaveHandler} />
    </div>
  );
};
