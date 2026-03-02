import { styles } from './Settings.styles';
import { useSettings } from './Settings.hooks';
import type { SettingsProps } from './Settings.types';
import { Button } from '../Button';
import { SettingsSection } from './components';
import { useTranslation } from 'react-i18next';

export const Settings = ({ sections, onSave }: SettingsProps) => {
  const { t } = useTranslation();
  const { setDataReceiver, handleSave } = useSettings(onSave);
  return (
    <div css={styles.container}>
      {sections.map((section) => (
        <SettingsSection
          key={section.id}
          section={section}
          setDataReceiver={setDataReceiver}
        />
      ))}
      <Button onClick={handleSave}>{t('common.save')}</Button>
    </div>
  );
};
