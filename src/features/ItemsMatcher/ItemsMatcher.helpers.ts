import * as XLSX from 'xlsx'
import type { File1Item, File2Item, MatchedItem, MatchType } from './ItemsMatcher.types'
import { FUZZY_MATCH_CONFIG, PRICE_CALCULATION, EXPORT_HEADERS, EXPORT_SHEET_NAME } from './ItemsMatcher.constants'

export const readExcelFile = (file: File): Promise<unknown[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' }) as unknown[][]
        resolve(jsonData)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsArrayBuffer(file)
  })
}

export const parseFile1 = (data: unknown[][]): File1Item[] => {
  const items: File1Item[] = []
  let currentItem: Partial<File1Item> | null = null

  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    const col0 = String(row?.[0] || '').trim()

    if (!col0) continue

    if (col0.startsWith('ТТН') || col0.startsWith('ТН') || col0.startsWith('Счет-фактура')) {
      if (currentItem) {
        const price = parseFloat(String(row?.[2] || 0)) || 0
        const amount = parseFloat(String(row?.[3] || 0)) || 0

        currentItem.totalAmount = (currentItem.totalAmount || 0) + amount
        if (price > 0) {
          currentItem.latestPrice = price
        }
      }
    } else {
      if (currentItem && currentItem.invNo && currentItem.name) {
        items.push({
          invNo: currentItem.invNo,
          name: currentItem.name,
          totalAmount: currentItem.totalAmount || 0,
          latestPrice: currentItem.latestPrice || 0
        })
      }

      const parts = col0.split(/\s+/)
      const invNo = parts[0]
      const name = parts.slice(1).join(' ')

      currentItem = {
        invNo,
        name,
        totalAmount: 0,
        latestPrice: 0,
        rawInvNoName: col0
      }
    }
  }

  if (currentItem && currentItem.invNo && currentItem.name) {
    items.push({
      invNo: currentItem.invNo,
      name: currentItem.name,
      totalAmount: currentItem.totalAmount || 0,
      latestPrice: currentItem.latestPrice || 0
    })
  }

  return items
}

export const parseFile2 = (data: unknown[][]): File2Item[] => {
  const items: File2Item[] = []

  for (let i = 1; i < data.length; i++) {
    const row = data[i]

    const barcode = String(row?.[0] || '').trim()
    const invNoName = String(row?.[1] || '').trim()
    const price = parseFloat(String(row?.[2] || 0)) || 0

    if (!invNoName) continue

    const parts = invNoName.split(/\s+/)
    const invNo = parts[0]
    const name = parts.slice(1).join(' ')

    items.push({
      barcode,
      invNo,
      name,
      price,
      rawData: `${barcode} | ${invNoName} | ${price}`
    })
  }

  return items
}

const normalizeInvNo = (invNo: string): string => invNo.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()

export const matchItems = (items1: File1Item[], items2: File2Item[]): MatchedItem[] => {
  const items2Map = new Map<string, File2Item>()
  items2.forEach((item) => {
    items2Map.set(item.invNo, item)
  })

  return items1.map((item) => {
    // Try exact match first
    if (items2Map.has(item.invNo)) {
      return {
        ...item,
        matchType: 'exact' as MatchType,
        matchedInvNo: item.invNo,
        matchedItem: items2Map.get(item.invNo) || null
      }
    }

    // Try fuzzy matching
    const normalized1 = normalizeInvNo(item.invNo)

    for (const [invNo2, item2] of items2Map) {
      const normalized2 = normalizeInvNo(invNo2)

      // Check if normalized versions match
      if (normalized1 === normalized2) {
        return {
          ...item,
          matchType: 'fuzzy' as MatchType,
          matchedInvNo: invNo2,
          matchedItem: item2
        }
      }

      // Check if one contains the other
      if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) {
        const longer = normalized1.length > normalized2.length ? normalized1 : normalized2
        const shorter = normalized1.length > normalized2.length ? normalized2 : normalized1

        let diff = ''
        if (longer.startsWith(shorter)) {
          diff = longer.substring(shorter.length)
        } else if (longer.endsWith(shorter)) {
          diff = longer.substring(0, longer.length - shorter.length)
        }

        if (diff === normalized1 || diff === normalized2) {
          continue
        }

        if (diff && FUZZY_MATCH_CONFIG.allowedDiffPattern.test(diff)) {
          return {
            ...item,
            matchType: 'fuzzy' as MatchType,
            matchedInvNo: invNo2,
            matchedItem: item2
          }
        }
      }
    }

    // No match found
    return {
      ...item,
      matchType: 'none' as MatchType,
      matchedInvNo: null,
      matchedItem: null
    }
  })
}

export const exportToXLS = (results: MatchedItem[]): void => {
  const matchedItems = results.filter((item) => item.matchType !== 'none')
  const unmatchedItems = results.filter((item) => item.matchType === 'none')
  const sortedItems = [...matchedItems, ...unmatchedItems]

  const data = [EXPORT_HEADERS]

  sortedItems.forEach((item) => {
    const name = item.rawInvNoName || `${item.invNo} ${item.name}`
    const amount = Math.round(item.totalAmount)

    let retailPrice = ''
    let discountPrice = ''
    let barcode = ''

    if (item.matchType !== 'none' && item.matchedItem) {
      if (item.matchedItem.price) {
        const price = `${item.matchedItem.price.toFixed(2)}`.replace('.', ',')
        retailPrice = price
        discountPrice = price
      }
      barcode = item.matchedItem.barcode || ''
    }

    if (!retailPrice && item.latestPrice > 0) {
      const calculatedPrice = item.latestPrice * PRICE_CALCULATION.multiplier1 * PRICE_CALCULATION.multiplier2 - PRICE_CALCULATION.subtractValue
      const price = `${calculatedPrice.toFixed(2)}`.replace('.', ',')
      retailPrice = price
      discountPrice = price
    }

    data.push([name, retailPrice, discountPrice, amount.toString(), barcode])
  })

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet(data as (string | number | boolean)[][])

  XLSX.utils.book_append_sheet(wb, ws, EXPORT_SHEET_NAME)

  const now = new Date()
  const dateStr = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}`
  const filename = `список с совпадениями (${dateStr}).xlsx`

  XLSX.writeFile(wb, filename)
}

export const getStats = (results: MatchedItem[]) => {
  return {
    total: results.length,
    exact: results.filter((r) => r.matchType === 'exact').length,
    fuzzy: results.filter((r) => r.matchType === 'fuzzy').length,
    manual: results.filter((r) => r.matchType === 'manual').length,
    unmatched: results.filter((r) => r.matchType === 'none').length
  }
}
