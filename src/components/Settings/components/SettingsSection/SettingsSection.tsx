import { styles } from './SettingsSection.styles';
import { SettingItemRenderer } from '../SettingItemRenderer';
import type { SettingsSectionProps } from './SettingsSection.types';

export const SettingsSection = ({
  section,
  setDataReceiver,
}: SettingsSectionProps) => {
  return (
    <div css={styles.section}>
      <h3 css={styles.sectionTitle}>{section.title}</h3>
      {section.settings.map((setting) => (
        <SettingItemRenderer
          key={setting.id}
          setting={setting}
          setDataReceiver={setDataReceiver}
        />
      ))}
    </div>
  );
};
