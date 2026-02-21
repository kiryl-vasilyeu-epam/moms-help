export type MatchType = 'exact' | 'fuzzy' | 'manual' | 'none'
export type FilterType = 'all' | 'exact' | 'fuzzy' | 'manual' | 'unmatched'

export interface File1Item {
  invNo: string
  name: string
  totalAmount: number
  latestPrice: number
  rawInvNoName?: string
}

export interface File2Item {
  barcode: string
  invNo: string
  name: string
  price: number
  rawData: string
}

export interface MatchedItem extends File1Item {
  matchType: MatchType
  matchedInvNo: string | null
  matchedItem: File2Item | null
  rawInvNoName?: string
}

export interface ParsedData {
  results: MatchedItem[]
  file2Items: File2Item[]
  timestamp: string
}

export interface Stats {
  total: number
  exact: number
  fuzzy: number
  manual: number
  unmatched: number
}

export interface DropdownItem {
  invNo: string
  name: string
  fullText: string
  index: number
  item: File2Item
}
