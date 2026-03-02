import {
  Button,
  Settings,
  SettingsProps,
  usePageSwitcherNavigation,
} from '@components';
import { stylesheet } from './SettingsSection.styles';
import { useTranslation } from 'react-i18next';
import { useStyles } from '@hooks';

export const SettingsSection = ({ sections, onSave }: SettingsProps) => {
  const { t } = useTranslation();
  const { goToPrevPage } = usePageSwitcherNavigation();
  const styles = useStyles(stylesheet);
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
