import { styles } from './ToggleSetting.styles';
import { useToggleSetting } from './ToggleSetting.hooks';
import type { ToggleSettingProps } from './ToggleSetting.types';

export const ToggleSetting = ({
  setting,
  setDataReceiver,
}: ToggleSettingProps) => {
  const { value, handleToggle } = useToggleSetting(setting, setDataReceiver);

  return (
    <div css={styles.settingRow}>
      <span css={styles.settingLabel}>{setting.label}</span>
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
