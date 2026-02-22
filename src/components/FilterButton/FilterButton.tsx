import { styles } from "./FilterButton.styles"
import type { FilterButtonProps } from "./FilterButton.types"

export const FilterButton = ({
  label,
  value,
  isActive = false,
  onClick,
}: FilterButtonProps) => {
  return (
    <button
      css={[styles.filterBtn, isActive && styles.activeButton]}
      data-filter={value}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
