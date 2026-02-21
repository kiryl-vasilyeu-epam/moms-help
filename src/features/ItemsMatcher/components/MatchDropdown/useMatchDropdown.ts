import { useState, useMemo, useCallback } from 'react'
import type { File2Item } from '../../ItemsMatcher.types'

export const useMatchDropdown = (items: File2Item[]) => {
  const [searchText, setSearchText] = useState('')

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const text = `${item.invNo} ${item.name}`.toLowerCase()
        return text.includes(searchText.toLowerCase())
      }),
    [items, searchText]
  )

  const updateSearch = useCallback((value: string) => {
    setSearchText(value)
  }, [])

  return { searchText, filteredItems, updateSearch }
}
