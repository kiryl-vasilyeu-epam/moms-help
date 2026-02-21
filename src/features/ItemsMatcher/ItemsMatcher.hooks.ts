import { useState, useCallback, useEffect } from 'react'
import { useLocalStorage } from '@hooks'
import { CONFIRMATION_MESSAGES } from './ItemsMatcher.constants'
import type { FilterType, MatchedItem, File2Item } from './ItemsMatcher.types'
import { STORAGE_KEYS } from '@constants'
import { matchItems, parseFile1, parseFile2, readExcelFile } from './ItemsMatcher.helpers'

export const useItemsMatcher = () => {
  const fileUpload = useFileUpload()
  const [allResults, setAllResults] = useLocalStorage<MatchedItem[]>(
    STORAGE_KEYS.ITEMS_MATCHER_RESULTS,
    []
  )
  const [file2Items, setFile2Items] = useLocalStorage<File2Item[]>(
    STORAGE_KEYS.ITEMS_MATCHER_FILE2ITEMS,
    []
  )
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all')
  const [showResults, setShowResults] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    if (allResults.length > 0) {
      setShowResults(true)
    }
  }, [allResults])

  const handleProcess = useCallback(() => {
    const result = fileUpload.processFiles()
    if (result) {
      const { items, file2Items: items2 } = result
      setAllResults(items)
      setFile2Items(items2)
      setShowResults(true)
    }
  }, [fileUpload, setAllResults, setFile2Items])

  const handleClear = useCallback(() => {
    if (confirm(CONFIRMATION_MESSAGES.clear)) {
      fileUpload.clearFiles()
      setAllResults([])
      setFile2Items([])
      setShowResults(false)
      setCurrentFilter('all')
    }
  }, [fileUpload, setAllResults, setFile2Items])

  const handleSelectMatch = useCallback((itemIndex: number) => {
    setSelectedItemIndex(itemIndex)
    setDropdownOpen(true)
  }, [])

  const handleSelectMatchItem = useCallback(
    (file2Index: number) => {
      if (selectedItemIndex === null) return

      const item2 = file2Items[file2Index]
      const updated = [...allResults]
      updated[selectedItemIndex] = {
        ...updated[selectedItemIndex],
        matchType: 'manual',
        matchedInvNo: item2.invNo,
        matchedItem: item2
      }

      setAllResults(updated)
      setSelectedItemIndex(null)
      setDropdownOpen(false)
    },
    [selectedItemIndex, allResults, file2Items, setAllResults]
  )

  const handleUnmatchItem = useCallback(
    (itemIndex: number) => {
      const updated = [...allResults]
      if (updated[itemIndex].matchType === 'fuzzy' || updated[itemIndex].matchType === 'manual') {
        updated[itemIndex] = {
          ...updated[itemIndex],
          matchType: 'none',
          matchedInvNo: null,
          matchedItem: null
        }
        setAllResults(updated)
      }
    },
    [allResults, setAllResults]
  )

  return {
    fileUpload,
    allResults,
    setAllResults,
    file2Items,
    setFile2Items,
    currentFilter,
    setCurrentFilter,
    showResults,
    setShowResults,
    selectedItemIndex,
    setSelectedItemIndex,
    dropdownOpen,
    setDropdownOpen,
    handleProcess,
    handleClear,
    handleSelectMatch,
    handleSelectMatchItem,
    handleUnmatchItem,
  }
}

export const useFileUpload = () => {
  const [file1Data, setFile1Data] = useState<unknown[][] | null>(null)
  const [file2Data, setFile2Data] = useState<unknown[][] | null>(null)
  const [file1Name, setFile1Name] = useState<string>('Файл не выбран')
  const [file2Name, setFile2Name] = useState<string>('Файл не выбран')
  const [loading, setLoading] = useState(false)

  const handleFile1Change = useCallback(async (file: File) => {
    setLoading(true)
    try {
      const data = await readExcelFile(file)
      setFile1Data(data)
      setFile1Name(file.name)
    } catch (error) {
      console.error('Failed to read file 1:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleFile2Change = useCallback(async (file: File) => {
    setLoading(true)
    try {
      const data = await readExcelFile(file)
      setFile2Data(data)
      setFile2Name(file.name)
    } catch (error) {
      console.error('Failed to read file 2:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const processFiles = useCallback((): { items: MatchedItem[]; file2Items: File2Item[] } | null => {
    if (!file1Data || !file2Data) return null

    const items1 = parseFile1(file1Data)
    const items2 = parseFile2(file2Data)
    const matchedItems = matchItems(items1, items2)

    return { items: matchedItems, file2Items: items2 }
  }, [file1Data, file2Data])

  const clearFiles = useCallback(() => {
    setFile1Data(null)
    setFile2Data(null)
    setFile1Name('Файл не выбран')
    setFile2Name('Файл не выбран')
  }, [])

  const isReady = file1Data !== null && file2Data !== null

  return {
    file1Name,
    file2Name,
    handleFile1Change,
    handleFile2Change,
    processFiles,
    clearFiles,
    isReady,
    loading
  }
}
