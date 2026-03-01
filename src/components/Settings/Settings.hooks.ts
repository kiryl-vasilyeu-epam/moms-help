import { useCallback, useState } from 'react';
import type { SaveDataItem, SetDataReceiver } from './Settings.types';

export const useSettings = (onSave: (data: SaveDataItem[]) => void) => {
  const [componentsDataReceivers, setComponentsDataReceivers] = useState<
    Record<string, () => SaveDataItem>
  >({});

  const setDataReceiver = useCallback<SetDataReceiver>(
    ({ id, receiveData }) => {
      setComponentsDataReceivers((prev) => ({
        ...prev,
        [id]: receiveData,
      }));
    },
    [],
  );

  const handleSave = () => {
    const dataToSave: SaveDataItem[] = Object.entries(
      componentsDataReceivers,
    ).map(([_id, receiveData]) => receiveData());

    onSave(dataToSave);
  };

  return { componentsDataReceivers, setDataReceiver, handleSave };
};
