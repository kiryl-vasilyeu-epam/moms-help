import type { MatchedItem, FilterType } from '../../ItemsMatcher.types'

export interface ResultsTableProps {
  items: MatchedItem[]
  filter: FilterType
  onUnmatchItem: (index: number) => void
  onSelectMatch: (itemIndex: number) => void
}

