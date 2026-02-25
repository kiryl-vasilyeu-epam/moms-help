import { styles } from "./FilterButton.styles";
import type { FilterButtonProps } from "./FilterButton.types";

export const FilterButton = <T extends string | number>({
  label,
  value,
  isActive = false,
  handleClick,
  disabled = false,
}: FilterButtonProps<T>) => {
  const onClick = () => !disabled && handleClick?.(value);
  return (
    <button
      css={[styles.filterBtn, isActive && styles.activeButton]}
      onClick={onClick}
      disabled={disabled}
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      {label}
    </button>
  );
};
