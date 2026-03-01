import { useCallback } from 'react';
import type {
  InputSettingItem,
  ToggleSettingItem,
  OrderSettingItem,
} from './Settings.types';

export const useInputSetting = ({
  onChange,
}: Pick<InputSettingItem, 'onChange'>) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return { handleChange };
};

export const useToggleSetting = ({
  value,
  onChange,
}: Pick<ToggleSettingItem, 'value' | 'onChange'>) => {
  const handleToggle = useCallback(() => {
    onChange(!value);
  }, [value, onChange]);

  return { handleToggle };
};

export const useOrderSetting = ({
  items,
  onOrderChange,
}: Pick<OrderSettingItem, 'items' | 'onOrderChange'>) => {
  const moveItem = useCallback(
    (index: number, direction: 'up' | 'down') => {
      const newItems = [...items];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= items.length) return;

      [newItems[index], newItems[targetIndex]] = [
        newItems[targetIndex],
        newItems[index],
      ];
      onOrderChange(newItems);
    },
    [items, onOrderChange],
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

  return {
    canMoveUp,
    canMoveDown,
    createMoveUpHandler,
    createMoveDownHandler,
  };
};
