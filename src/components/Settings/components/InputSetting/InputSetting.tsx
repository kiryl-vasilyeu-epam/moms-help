import { TextField } from '@mui/material';
import { styles } from './InputSetting.styles';
import { useInputSetting } from './InputSetting.hooks';
import type { InputSettingProps } from './InputSetting.types';

export const InputSetting = ({
  setting,
  setDataReceiver,
}: InputSettingProps) => {
  const { value, handleChange } = useInputSetting(setting, setDataReceiver);

  return (
    <div css={styles.settingRow}>
      <span css={styles.settingLabel}>{setting.label}</span>
      <TextField type="text" value={value} onChange={handleChange} multiline />
    </div>
  );
};
