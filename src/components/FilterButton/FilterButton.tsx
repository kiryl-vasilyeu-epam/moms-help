import { useCallback } from 'react';
import { stylesheet } from './FilterButton.styles';
import type { FilterButtonProps } from './FilterButton.types';
import { useStyles } from '@hooks';

export const FilterButton = <T extends string | number>({
  label,
  value,
  isActive = false,
  handleClick,
  disabled = false,
}: FilterButtonProps<T>) => {
  const styles = useStyles(stylesheet);
  const onClick = useCallback(
    () => !disabled && handleClick?.(value),
    [handleClick, value, disabled],
  );
  return (
    <button
      css={[styles.filterBtn, isActive && styles.activeButton]}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
