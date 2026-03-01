import { useCallback, useEffect, useRef, useState } from 'react';
import type { OrderSettingItem, SetDataReceiver } from '../../Settings.types';

const ANIMATION_DURATION = 300;

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
  const [animatingIndices, setAnimatingIndices] = useState<{
    from: number;
    to: number;
  } | null>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const setItemRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      if (el) {
        itemRefs.current.set(id, el);
      } else {
        itemRefs.current.delete(id);
      }
    },
    [],
  );

  const moveItem = useCallback(
    (index: number, direction: 'up' | 'down') => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= items.length) return;

      // Set animating indices to trigger CSS animation
      setAnimatingIndices({ from: index, to: targetIndex });

      // After animation completes, swap the items
      setTimeout(() => {
        setItems((prevItems) => {
          const newItems = [...prevItems];
          [newItems[index], newItems[targetIndex]] = [
            newItems[targetIndex],
            newItems[index],
          ];
          return newItems;
        });
        setInputValues((prevInputValues) => {
          const newInputValues = [...prevInputValues];
          [newInputValues[index], newInputValues[targetIndex]] = [
            newInputValues[targetIndex],
            newInputValues[index],
          ];
          return newInputValues;
        });
        setAnimatingIndices(null);
      }, ANIMATION_DURATION);
    },
    [items.length],
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

  const getAnimationStyle = useCallback(
    (index: number) => {
      if (!animatingIndices) return undefined;

      const { from, to } = animatingIndices;
      const currentItemId = items[index]?.id;
      const currentRef = currentItemId
        ? itemRefs.current.get(currentItemId)
        : null;
      const targetItemId = items[index === from ? to : from]?.id;
      const targetRef = targetItemId
        ? itemRefs.current.get(targetItemId)
        : null;

      if (!currentRef || !targetRef) return undefined;

      const currentRect = currentRef.getBoundingClientRect();
      const targetRect = targetRef.getBoundingClientRect();
      const offset = targetRect.top - currentRect.top;

      if (index === from || index === to) {
        return {
          transform: `translateY(${offset}px)`,
          transition: `transform ${ANIMATION_DURATION}ms ease-in-out`,
          zIndex: index === from ? 2 : 1,
        };
      }

      return undefined;
    },
    [animatingIndices, items],
  );

  return {
    items,
    canMoveUp,
    canMoveDown,
    createMoveUpHandler,
    createMoveDownHandler,
    inputValues,
    handleInputChange,
    animatingIndices,
    setItemRef,
    getAnimationStyle,
  };
};
