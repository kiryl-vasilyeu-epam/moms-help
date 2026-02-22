import type { FilterType } from '../../ItemsMatcher.types'

export interface FilterButtonsProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}
