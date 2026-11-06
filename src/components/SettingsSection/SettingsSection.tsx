import {
  Button,
  Settings,
  Typography,
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
      <div css={styles.header}>
        <Button variant="soft" onClick={goToPrevPage} style={styles.back}>
          ← {t('common.backWithoutSaving')}
        </Button>
        <Typography variant="h2">{t('fileUpload.settings')}</Typography>
      </div>
      <Settings sections={sections} onSave={onSaveHandler} />
    </div>
  );
};
