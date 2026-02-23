import { styles } from "./FilterButton.styles";
import type { FilterButtonProps } from "./FilterButton.types";

export const FilterButton = <T extends string | number>({
  label,
  value,
  isActive = false,
  handleClick,
}: FilterButtonProps<T>) => {
  const onClick = () => handleClick?.(value);
  return (
    <button
      css={[styles.filterBtn, isActive && styles.activeButton]}
      data-filter={value}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
