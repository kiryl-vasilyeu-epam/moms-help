import type { PriceItem, SolutionItem, ProgressUpdate } from './PriceMatcher.types'

/**
 * Parse money string in various formats to cents
 * Handles: "1234.56", "1234,56", "1 234.56", "1 234,56", "1.234,56" (RU format)
 */
export const parseMoneyToCents = (moneyStr: string): number => {
  if (!moneyStr || typeof moneyStr !== 'string') return 0

  // Remove spaces
  let cleaned = moneyStr.trim().replace(/\s/g, '')

  // Detect separator type
  const commaCount = (cleaned.match(/,/g) || []).length
  const dotCount = (cleaned.match(/\./g) || []).length

  // Handle Russian format: 1.234,56 (dot as thousands, comma as decimal)
  if (dotCount > 1 || (dotCount === 1 && commaCount === 1 && cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.'))) {
    cleaned = cleaned.replace(/\./g, '').replace(',', '.')
  } else if (commaCount > 1 || (commaCount === 1 && dotCount === 0)) {
    // Handle: 1,234,567.89 or 1,234 (comma as thousands)
    cleaned = cleaned.replace(/,/g, '.')
  } else if (commaCount === 1 && dotCount === 0) {
    // Single comma - assume decimal
    cleaned = cleaned.replace(',', '.')
  }

  const num = parseFloat(cleaned)
  if (Number.isNaN(num)) return 0

  // Convert to cents and round
  return Math.round(num * 100)
}

/**
 * Convert cents to display string format
 */
export const centsToStr = (cents: number): string => {
  if (!Number.isInteger(cents)) {
    cents = Math.round(cents)
  }

  const rubles = Math.floor(cents / 100)
  const kopecks = cents % 100

  if (kopecks === 0) {
    return `${rubles},00`
  }

  return `${rubles},${String(kopecks).padStart(2, '0')}`
}

/**
 * Parse multiple sum strings (supports newline-separated, comma-separated, etc.)
 */
export const parseSums = (input: string): number[] => {
  const matches = String(input).match(/-?\d+(?:[.,]\d+)?/g) || []
  return matches
    .map((m) => parseMoneyToCents(m))
    .filter((c) => Number.isInteger(c) && c > 0)
}

/**
 * Yield control back to browser for responsive UI
 */
export const yieldToBrowser = (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

/**
 * Optimized DP-based solution for subset sum with bounded quantities
 * Finds exact combination of items to match target sum
 */
export const findExactCombination = async (
  targetCents: number,
  availableItems: PriceItem[],
  onProgress?: (progress: ProgressUpdate) => void
): Promise<SolutionItem[] | null> => {
  // Safety checks
  if (!Array.isArray(availableItems) || availableItems.length === 0) {
    return null
  }

  if (!Number.isInteger(targetCents) || targetCents <= 0) {
    return null
  }

  // Safeguards
  const MAX_TIME_MS = 60000 // 60 seconds timeout
  const YIELD_INTERVAL = 100 // Yield every 100 items processed
  const startTime = Date.now()

  // Preprocess: filter and sort items by price descending (greedy optimization)
  const validItems = availableItems
    .map((item, idx) => {
      if (!item || typeof item !== 'object') return null
      const remainingQty = Math.max(0, item.remainingAmount || item.amount || 0)
      const unitCents = item.salePriceCents || 0
      if (unitCents <= 0 || remainingQty <= 0) return null
      return { item, remainingQty, unitCents, originalIndex: idx }
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => b.unitCents - a.unitCents) // Sort descending by price

  if (validItems.length === 0) {
    return null
  }

  // Quick feasibility check
  const minPrice = validItems[validItems.length - 1].unitCents
  const maxPossible = validItems.reduce((sum, v) => sum + v.unitCents * v.remainingQty, 0)
  if (targetCents > maxPossible || targetCents < minPrice) {
    return null
  }

  // Use DP: dp[sum] = best way to achieve that sum
  const dp = new Map<number, SolutionItem[]>()
  dp.set(0, []) // Base case: sum 0 requires no items

  let processedItems = 0
  const totalItems = validItems.length

  // Calculate remaining value for each position (for pruning)
  const remainingValue = new Array(validItems.length + 1).fill(0)
  for (let i = validItems.length - 1; i >= 0; i--) {
    remainingValue[i] = remainingValue[i + 1] + validItems[i].unitCents * validItems[i].remainingQty
  }

  // Process each item
  for (let itemIdx = 0; itemIdx < validItems.length; itemIdx++) {
    const { item, remainingQty, unitCents } = validItems[itemIdx]
    processedItems++

    // Yield periodically
    if (processedItems % YIELD_INTERVAL === 0) {
      await yieldToBrowser()
      if (onProgress) {
        onProgress({
          processedItems,
          totalItems,
          dpSize: dp.size,
          elapsed: Date.now() - startTime,
        })
      }

      // Check timeout
      if (Date.now() - startTime > MAX_TIME_MS) {
        console.warn('Calculation timeout reached')
        return null
      }
    }

    // Create new DP state by processing current item
    const newDp = new Map<number, SolutionItem[]>()

    // Iterate through all achievable sums so far
    for (const [currentSum, combination] of dp.entries()) {
      // Pruning: skip if we can't reach target even with all remaining items
      if (currentSum + remainingValue[itemIdx] < targetCents) {
        continue // Can't reach target
      }

      if (currentSum > targetCents) {
        continue // Already exceeded
      }

      // Try all possible quantities of current item
      const maxQty = Math.min(remainingQty, Math.floor((targetCents - currentSum) / unitCents))

      for (let qty = 0; qty <= maxQty; qty++) {
        const newSum = currentSum + unitCents * qty

        if (newSum > targetCents) break

        // Only keep if we haven't seen this sum yet, or if this is a better path
        const newCombination: SolutionItem[] =
          qty > 0
            ? [...combination, { ...item, quantity: qty }]
            : combination

        if (!newDp.has(newSum) || newDp.get(newSum)!.length > newCombination.length) {
          newDp.set(newSum, newCombination)
        }
      }
    }

    // Merge: keep all sums from old dp that are still valid
    for (const [sum, combination] of dp.entries()) {
      if (sum <= targetCents && sum + remainingValue[itemIdx + 1] >= targetCents) {
        if (!newDp.has(sum) || newDp.get(sum)!.length > combination.length) {
          newDp.set(sum, combination)
        }
      }
    }

    // Update dp to new state
    dp.clear()
    for (const [sum, combination] of newDp.entries()) {
      dp.set(sum, combination)
    }

    // Early exit if we found the target
    if (dp.has(targetCents)) {
      return dp.get(targetCents) || null
    }
  }

  // Check if we found the target
  return dp.get(targetCents) || null
}
