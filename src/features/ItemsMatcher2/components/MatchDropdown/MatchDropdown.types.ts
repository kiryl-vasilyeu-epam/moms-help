import type { File2Item } from '../../ItemsMatcher.types'

export interface MatchDropdownProps {
  open: boolean
  items: File2Item[]
  onSelect: (index: number) => void
  onClose: () => void
}
