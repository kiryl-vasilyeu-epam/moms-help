export interface PriceItem {
  rowNumber: number
  name: string
  priceCents: number
  salePriceCents: number
  amount: number
  originalAmount: number
  remainingAmount: number
  usedAmount: number
}

export interface SolutionItem extends PriceItem {
  quantity: number
}

export interface Calculation {
  calculationNumber: number
  targetCents: number
  calculatedCents: number | null
  solution: SolutionItem[] | null
  timestamp: string
}

export interface FailedCalculation {
  targetCents: number
  reason: 'no_items' | 'no_combination'
}

export interface TransferredItem {
  name: string
  price: number
  amount: number
  matched: boolean
}

export interface ProgressUpdate {
  processedItems: number
  totalItems: number
  dpSize: number
  elapsed: number
}

export interface AllUsedItems {
  [key: string]: {
    name: string
    rowNumber: number | string
    quantity: number
    salePriceCents: number
  }
}
