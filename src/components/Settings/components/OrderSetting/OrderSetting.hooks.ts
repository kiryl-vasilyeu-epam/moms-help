import { useCallback, useEffect, useState } from 'react';
import type { OrderSettingItem, SetDataReceiver } from '../../Settings.types';

export const useOrderSetting = ({
  item,
  setDataReceiver,
}: {
  item: OrderSettingItem;
  setDataReceiver: SetDataReceiver;
}) => {
  const [inputValues, setInputValues] = useState(
    item.items.map((item) => item.inputValue ?? ''),
  );
  const [items, setItems] = useState(item.items);

  const moveItem = useCallback(
    (index: number, direction: 'up' | 'down') => {
      const newItems = [...items];
      const newInputValues = [...inputValues];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= items.length) return;

      [newItems[index], newItems[targetIndex]] = [
        newItems[targetIndex],
        newItems[index],
      ];
      [newInputValues[index], newInputValues[targetIndex]] = [
        newInputValues[targetIndex],
        newInputValues[index],
      ];
      setItems(newItems);
      setInputValues(newInputValues);
    },
    [items, inputValues],
  );

  const canMoveUp = useCallback((index: number) => index > 0, []);

  const canMoveDown = useCallback(
    (index: number) => index < items.length - 1,
    [items.length],
  );

  const createMoveUpHandler = useCallback(
    (index: number) => () => moveItem(index, 'up'),
    [moveItem],
  );

  const createMoveDownHandler = useCallback(
    (index: number) => () => moveItem(index, 'down'),
    [moveItem],
  );

  const handleInputChange = useCallback(
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValues((prev) => {
        const newValues = [...prev];
        newValues[index] = e.target.value;
        return newValues;
      });
    },
    [],
  );

  useEffect(() => {
    setDataReceiver({
      id: item.id,
      receiveData: () => ({
        id: item.id,
        type: 'order',
        items: items.map((item, index) => ({
          id: item.id,
          inputValue: inputValues[index],
          withInput: item.withInput,
        })),
      }),
    });
  }, [item.id, items, inputValues, setDataReceiver]);

  return {
    items,
    canMoveUp,
    canMoveDown,
    createMoveUpHandler,
    createMoveDownHandler,
    inputValues,
    handleInputChange,
  };
};
