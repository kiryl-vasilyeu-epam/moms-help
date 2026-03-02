import { stylesheet } from './ToggleSetting.styles';
import { useToggleSetting } from './ToggleSetting.hooks';
import type { ToggleSettingProps } from './ToggleSetting.types';
import { Typography } from '../../../Typography';
import { useStyles } from '@hooks';

export const ToggleSetting = ({
  setting,
  setDataReceiver,
}: ToggleSettingProps) => {
  const { value, handleToggle } = useToggleSetting(setting, setDataReceiver);
  const styles = useStyles(stylesheet);

  return (
    <div css={styles.settingRow}>
      <Typography variant="label" style={styles.settingLabel}>
        {setting.label}
      </Typography>
      <div
        css={[styles.toggle, setting.value && styles.toggleActive]}
        onClick={handleToggle}
        role="switch"
        aria-checked={setting.value}
      >
        <div css={[styles.toggleKnob, value && styles.toggleKnobActive]} />
      </div>
    </div>
  );
};
