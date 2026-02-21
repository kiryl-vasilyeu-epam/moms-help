import type { PriceItem } from '../../PriceMatcher.types'

export interface ItemsTableProps {
  items: PriceItem[]
  centsToStr: (cents: number) => string
}
