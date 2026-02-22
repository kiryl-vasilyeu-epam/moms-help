import { useCallback } from 'react'
import { useLocalStorage } from '@hooks/useLocalStorage'
import { CONFIRMATION_MESSAGES, TRANSFER_STORAGE_KEY } from '../../ItemsMatcher.constants'
import { exportToXLS } from '../../ItemsMatcher.helpers'
import type { MatchedItem } from '../../ItemsMatcher.types'

// returned handlers for action buttons
export const useActionButtons = (results: MatchedItem[]) => {
  // we don't actually read this value in the app; it's only stored for
  // the price matcher to pick up later, but using the hook keeps us
  // consistent with the rest of the codebase instead of touching
  // window.localStorage directly.
  const [, setTransferData] = useLocalStorage<Record<string, unknown>>(
    TRANSFER_STORAGE_KEY,
    {}
  )

  const handleDownload = useCallback(() => {
    if (results.length === 0) {
      alert(CONFIRMATION_MESSAGES.noData)
      return
    }
    exportToXLS(results)
  }, [results])

  const handleTransfer = useCallback(() => {
    if (results.length === 0) {
      alert(CONFIRMATION_MESSAGES.noDataTransfer)
      return
    }

    const priceMatcherData = {
      items: results.map((item) => ({
        name: item.rawInvNoName || `${item.invNo} ${item.name}`,
        amount: Math.round(item.totalAmount),
        price: item.latestPrice,
        matched: item.matchType !== 'none'
      })),
      timestamp: new Date().toISOString()
    }

    setTransferData(priceMatcherData)
    alert('✓ Данные переданы в "Поиск цен"')
  }, [results, setTransferData])

  return { handleDownload, handleTransfer }
}
