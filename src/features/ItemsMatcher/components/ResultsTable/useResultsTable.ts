import { useMemo } from 'react'
import type { MatchedItem, FilterType } from '../../ItemsMatcher.types'
import { TABLE_HEADERS } from '@features/ItemsMatcher/ItemsMatcher.constants'

export const COLUMN_WIDTHS = {
  index: '9.09%', // 1/11
  invNo: '18.18%', // 2/11
  name: '27.27%', // 3/11
  amount: '9.09%', // 1/11
  price: '9.09%', // 1/11
  matched: '18.18%', // 2/11
  status: '9.09%', // 1/11
}

export const COLUMNS_DETAILS = [
  { id: 'index', label: TABLE_HEADERS[0], width: COLUMN_WIDTHS.index },
  { id: 'invNo', label: TABLE_HEADERS[1], width: COLUMN_WIDTHS.invNo },
  { id: 'name', label: TABLE_HEADERS[2], width: COLUMN_WIDTHS.name },
  { id: 'amount', label: TABLE_HEADERS[3], width: COLUMN_WIDTHS.amount },
  { id: 'price', label: TABLE_HEADERS[4], width: COLUMN_WIDTHS.price },
  { id: 'matched', label: TABLE_HEADERS[5], width: COLUMN_WIDTHS.matched },
  { id: 'status', label: TABLE_HEADERS[6], width: COLUMN_WIDTHS.status },
]

export const useResultsTable = (items: MatchedItem[], filter: FilterType) => {
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filter === 'all') return true
      if (filter === 'exact') return item.matchType === 'exact'
      if (filter === 'fuzzy') return item.matchType === 'fuzzy'
      if (filter === 'manual') return item.matchType === 'manual'
      if (filter === 'unmatched') return item.matchType === 'none'
      return true
    })
  }, [items, filter])


  return { filteredItems }
}
