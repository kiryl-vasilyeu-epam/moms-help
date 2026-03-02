import { styles } from './SettingsSection.styles';
import { SettingItemRenderer } from '../SettingItemRenderer';
import type { SettingsSectionProps } from './SettingsSection.types';
import { Typography } from '../../../Typography';

export const SettingsSection = ({
  section,
  setDataReceiver,
}: SettingsSectionProps) => {
  return (
    <div css={styles.section}>
      <Typography variant="h3" color="white" style={styles.sectionTitle}>
        {section.title}
      </Typography>
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
