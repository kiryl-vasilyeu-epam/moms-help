export type Stats = 'total' | 'exact' | 'fuzzy' | 'manual' | 'unmatched'

export type MatchType = 'exact' | 'fuzzy' | 'manual' | 'none'
export type FilterType = 'all' | 'exact' | 'fuzzy' | 'manual' | 'unmatched'

export interface File1C {
  invNo: string
  name: string
  totalAmount: number
  latestPrice: number
  rawInvNoName?: string
}

export interface FileFusion{
  barcode: string
  invNo: string
  name: string
  price: number
  rawData: string
}

export interface MatchedItem extends File1C {
  matchType: MatchType
  matchedInvNo: string | null
  matchedItem: FileFusion | null
  rawInvNoName?: string
}

export interface ParsedData {
  results: MatchedItem[]
  FileFusions: FileFusion[]
  timestamp: string
}

export interface Stats1 {
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
  item: FileFusion
}
