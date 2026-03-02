import { TextField } from '@mui/material';
import { styles } from './InputSetting.styles';
import { useInputSetting } from './InputSetting.hooks';
import type { InputSettingProps } from './InputSetting.types';
import { Typography } from '../../../Typography';

export const InputSetting = ({
  setting,
  setDataReceiver,
}: InputSettingProps) => {
  const { value, handleChange } = useInputSetting(setting, setDataReceiver);

  return (
    <div css={styles.settingRow}>
      <Typography variant="label" style={styles.settingLabel}>
        {setting.label}
      </Typography>
      <TextField type="text" value={value} onChange={handleChange} multiline />
    </div>
  );
};
