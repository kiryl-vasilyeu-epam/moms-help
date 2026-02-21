import { useMemo } from 'react'
import type { FilterType } from '../../ItemsMatcher.types'

const allFilters: FilterType[] = ['all', 'exact', 'fuzzy', 'manual', 'unmatched']

export const useFilterButtons = () => {
  const filters = useMemo(() => allFilters, [])

  const getButtonSx = (filter: FilterType, current: FilterType) => {
    return current === filter ? 'selected' : 'normal'
  }

  return { filters, getButtonSx }
}
