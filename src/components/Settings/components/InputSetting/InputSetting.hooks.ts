import { useCallback, useEffect, useState } from 'react';
import type { InputSettingItem, SetDataReceiver } from '../../Settings.types';

export const useInputSetting = (
  item: InputSettingItem,
  setDataReceiver: SetDataReceiver,
) => {
  const [value, setValue] = useState(item.value);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    setDataReceiver({
      id: item.id,
      receiveData: () => ({
        id: item.id,
        type: 'input',
        value,
      }),
    });
  }, [item.id, value, setDataReceiver]);

  return { value, handleChange };
};
