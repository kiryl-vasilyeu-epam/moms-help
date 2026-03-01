import { useCallback, useEffect, useState } from 'react';
import type { ToggleSettingItem, SetDataReceiver } from '../../Settings.types';

export const useToggleSetting = (
  item: ToggleSettingItem,
  setDataReceiver: SetDataReceiver,
) => {
  const [value, setValue] = useState(item.value);

  const handleToggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  useEffect(() => {
    setDataReceiver({
      id: item.id,
      receiveData: () => ({
        id: item.id,
        type: 'toggle',
        value,
      }),
    });
  }, [item.id, value, setDataReceiver]);

  return { value, handleToggle };
};
