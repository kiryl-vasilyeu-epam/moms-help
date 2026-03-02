import { stylesheet } from './SettingsSection.styles';
import { SettingItemRenderer } from '../SettingItemRenderer';
import type { SettingsSectionProps } from './SettingsSection.types';
import { Typography } from '../../../Typography';
import { useStyles } from '@hooks';

export const SettingsSection = ({
  section,
  setDataReceiver,
}: SettingsSectionProps) => {
  const styles = useStyles(stylesheet);
  return (
    <div css={styles.section}>
      <Typography variant="h3" style={styles.sectionTitle}>
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
