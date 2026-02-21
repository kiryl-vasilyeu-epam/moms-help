import { useState, useCallback, useEffect, useMemo } from 'react'
import * as XLSX from 'xlsx'
import { useLocalStorage } from '@hooks/useLocalStorage'
import {
  PRICE_MATCHER_ITEMS_KEY,
  PRICE_MATCHER_ORIGINAL_ITEMS_KEY,
  PRICE_MATCHER_USAGE_HISTORY_KEY,
  PRICE_MATCHER_TRANSFER_DATA_KEY,
} from './PriceMatcher.constants'
import type {
  PriceItem,
  Calculation,
  FailedCalculation,
  TransferredItem,
  AllUsedItems,
} from './PriceMatcher.types'
import {
  parseMoneyToCents,
  centsToStr,
  parseSums,
  yieldToBrowser,
  findExactCombination,
} from './PriceMatcher.helpers'

export const usePriceMatcher = () => {
  const [items, setItems] = useState<PriceItem[]>([])
  const [originalItems, setOriginalItems] = useState<PriceItem[]>([])
  const [usageHistory, setUsageHistory] = useState<Calculation[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [failedCalculations, setFailedCalculations] = useState<FailedCalculation[]>([])
  const [showNoSolutionModal, setShowNoSolutionModal] = useState(false)

  // Sync with localStorage
  const [storedItems, setStoredItems] = useLocalStorage<PriceItem[]>(PRICE_MATCHER_ITEMS_KEY, [])
  const [storedOriginal, setStoredOriginal] = useLocalStorage<PriceItem[]>(
    PRICE_MATCHER_ORIGINAL_ITEMS_KEY,
    []
  )
  const [storedHistory, setStoredHistory] = useLocalStorage<Calculation[]>(
    PRICE_MATCHER_USAGE_HISTORY_KEY,
    []
  )
  const [transferredData] = useLocalStorage<TransferredItem[] | null>(
    PRICE_MATCHER_TRANSFER_DATA_KEY,
    null
  )

  // Load initial data from localStorage or transferred data
  useEffect(() => {
    // Check if data was transferred from ItemsMatcher
    if (transferredData && transferredData.length > 0) {
      const convertedItems: PriceItem[] = transferredData.map((item, idx) => ({
        rowNumber: idx + 2,
        name: item.name,
        priceCents: Math.round(item.price * 100),
        salePriceCents: Math.round(item.price * 100),
        amount: item.amount,
        originalAmount: item.amount,
        remainingAmount: item.amount,
        usedAmount: 0,
      }))

      setItems(convertedItems)
      setOriginalItems(convertedItems.map((item) => ({ ...item })))
      setUsageHistory([])
      setStoredItems(convertedItems)
      setStoredOriginal(convertedItems.map((item) => ({ ...item })))
      setStoredHistory([])
    } else if (storedItems && storedItems.length > 0) {
      // Load from localStorage
      setItems(storedItems)
      setOriginalItems(storedOriginal || [])
      setUsageHistory(storedHistory || [])
    }
  }, [transferredData])

  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: 'array' })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]

        if (!sheet) {
          alert('Ошибка чтения листа Excel')
          return
        }

        const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { header: 1 })

        if (rows.length < 2) {
          alert('Файл должен содержать заголовок и хотя бы одну строку данных')
          return
        }

        const headers = ((rows[0] as unknown) as unknown[]).map((h) => String(h))
        const nameIdx = headers.findIndex((h) =>
          String(h).toLowerCase().includes('наимено')
        )
        const priceIdx = headers.findIndex((h) => String(h).toLowerCase().includes('цена'))
        const salePriceIdx = headers.findIndex((h) =>
          String(h).toLowerCase().includes('скидк')
        )
        const amountIdx = headers.findIndex((h) => String(h).toLowerCase().includes('кол-во'))

        if (nameIdx === -1 || priceIdx === -1 || amountIdx === -1) {
          alert('Не найдены все необходимые колонки: Наименование, Цена, Кол-во')
          return
        }

        const newItems = rows
          .slice(1) // Skip header
          .map((row, index) => {
            const name = String(row[nameIdx] || '').trim()
            const priceCents = parseMoneyToCents(String(row[priceIdx] || ''))
            const salePriceCents = salePriceIdx !== -1 ? parseMoneyToCents(String(row[salePriceIdx] || '')) : priceCents
            const amount = Math.max(0, parseInt(String(row[amountIdx] || '0'), 10) || 0)

            return {
              rowNumber: index + 2,
              name,
              priceCents,
              salePriceCents,
              amount,
              originalAmount: amount,
              remainingAmount: amount,
              usedAmount: 0,
            }
          })
          .filter((item) => item.name && item.amount > 0)

        if (newItems.length === 0) {
          alert('В файле не найдено валидных товаров. Проверьте названия колонок.')
          return
        }

        setItems(newItems)
        setOriginalItems(newItems.map((item) => ({ ...item })))
        setUsageHistory([])
        setStoredItems(newItems)
        setStoredOriginal(newItems.map((item) => ({ ...item })))
        setStoredHistory([])
      } catch (error) {
        console.error('Error reading file:', error)
        alert('Ошибка чтения файла: ' + (error instanceof Error ? error.message : 'Unknown error'))
      }
    }

    reader.readAsArrayBuffer(file)
  }, [setStoredItems, setStoredOriginal, setStoredHistory])

  const handleCalculate = useCallback(
    async (sumsInput: string) => {
      const targetCentsList = parseSums(sumsInput)

      if (targetCentsList.length === 0) {
        alert('Пожалуйста, введите хотя бы одну валидную сумму.')
        return
      }

      if (!Array.isArray(items) || items.length === 0) {
        alert('Пожалуйста, сначала загрузите файл с товарами.')
        return
      }

      setLoading(true)
      setLoadingText('Подготовка к вычислению...')
      setFailedCalculations([])

      try {
        await yieldToBrowser()

        let calculationNumber = usageHistory.length + 1
        const newHistory: Calculation[] = []
        const failedCalcs: FailedCalculation[] = []
        const updatedItems = [...items]
        const totalCalculations = targetCentsList.length

        for (let i = 0; i < targetCentsList.length; i++) {
          const targetCents = targetCentsList[i]

          setLoadingText(`Обработка ${i + 1} из ${totalCalculations} сумм...`)
          await yieldToBrowser()

          const availableItems = updatedItems
            .filter((item) => {
              if (!item || typeof item !== 'object') return false
              const remaining =
                item.remainingAmount !== undefined
                  ? item.remainingAmount
                  : (item.originalAmount || item.amount || 0) - (item.usedAmount || 0)
              const priceCents = item.salePriceCents || 0
              return remaining > 0 && priceCents > 0
            })
            .map((item) => ({
              ...item,
              remainingAmount:
                item.remainingAmount !== undefined
                  ? item.remainingAmount
                  : Math.max(
                      0,
                      (item.originalAmount || item.amount || 0) - (item.usedAmount || 0)
                    ),
              amount:
                item.remainingAmount !== undefined
                  ? item.remainingAmount
                  : Math.max(
                      0,
                      (item.originalAmount || item.amount || 0) - (item.usedAmount || 0)
                    ),
            }))

          if (availableItems.length === 0) {
            failedCalcs.push({
              targetCents,
              reason: 'no_items',
            })
            newHistory.push({
              calculationNumber: calculationNumber++,
              targetCents,
              calculatedCents: null,
              solution: null,
              timestamp: new Date().toISOString(),
            })
            continue
          }

          setLoadingText(`Поиск комбинации для ${centsToStr(targetCents)} (${i + 1}/${totalCalculations})...`)

          const solution = await findExactCombination(targetCents, availableItems)

          if (solution && solution.length > 0) {
            let calculatedCents = 0
            solution.forEach((item) => {
              calculatedCents += (item.salePriceCents || 0) * item.quantity
            })

            // Update item quantities
            solution.forEach((solutionItem) => {
              if (!solutionItem || !solutionItem.name) return
              const item = updatedItems.find((i) => i && i.name === solutionItem.name)
              if (item && solutionItem.quantity > 0) {
                item.usedAmount = (item.usedAmount || 0) + solutionItem.quantity
                const originalAmount = item.originalAmount || item.amount || 0
                item.remainingAmount = Math.max(0, originalAmount - item.usedAmount)
              }
            })

            newHistory.push({
              calculationNumber: calculationNumber++,
              targetCents,
              calculatedCents,
              solution: solution,
              timestamp: new Date().toISOString(),
            })
          } else {
            failedCalcs.push({
              targetCents,
              reason: 'no_combination',
            })
            newHistory.push({
              calculationNumber: calculationNumber++,
              targetCents,
              calculatedCents: null,
              solution: null,
              timestamp: new Date().toISOString(),
            })
          }
        }

        // Renumber all calculations to be sequential
        const allHistory = [...usageHistory, ...newHistory]
        allHistory.forEach((calc, idx) => {
          if (calc) {
            calc.calculationNumber = idx + 1
          }
        })

        setItems(updatedItems)
        setUsageHistory(allHistory)
        setFailedCalculations(failedCalcs)
        setStoredItems(updatedItems)
        setStoredHistory(allHistory)

        if (failedCalcs.length > 0) {
          setShowNoSolutionModal(true)
        }
      } catch (error) {
        console.error('Error during calculation:', error)
        alert('Произошла ошибка при вычислении. Проверьте консоль для деталей.')
      } finally {
        setLoading(false)
        setLoadingText('')
      }
    },
    [items, usageHistory, setStoredItems, setStoredHistory]
  )

  const handleRemoveCalculation = useCallback(
    (index: number) => {
      if (index < 0 || index >= usageHistory.length) return

      const calculation = usageHistory[index]
      const newItems = [...items]

      // Restore item quantities
      if (calculation.solution && calculation.solution.length > 0) {
        calculation.solution.forEach((solutionItem) => {
          const item = newItems.find((i) => i.name === solutionItem.name)
          if (item) {
            item.usedAmount = Math.max(0, (item.usedAmount || 0) - solutionItem.quantity)
            item.remainingAmount = (item.remainingAmount || 0) + solutionItem.quantity
            const maxAmount = item.originalAmount || item.amount
            if (item.remainingAmount > maxAmount) {
              item.remainingAmount = maxAmount
            }
          }
        })
      }

      const newHistory = usageHistory.filter((_, i) => i !== index)
      newHistory.forEach((calc, idx) => {
        calc.calculationNumber = idx + 1
      })

      setItems(newItems)
      setUsageHistory(newHistory)
      setStoredItems(newItems)
      setStoredHistory(newHistory)
    },
    [items, usageHistory, setStoredItems, setStoredHistory]
  )

  const handleReset = useCallback(() => {
    if (confirm('Вы уверены, что хотите сбросить все данные?')) {
      setItems([])
      setOriginalItems([])
      setUsageHistory([])
      setStoredItems([])
      setStoredOriginal([])
      setStoredHistory([])
    }
  }, [setStoredItems, setStoredOriginal, setStoredHistory])

  const allUsedItems = useMemo<AllUsedItems>(() => {
    const used: AllUsedItems = {}

    usageHistory.forEach((historyItem) => {
      if (historyItem.solution && historyItem.solution.length > 0) {
        historyItem.solution.forEach((item) => {
          if (!item || typeof item !== 'object' || !item.name) return
          if (!used[item.name]) {
            const foundItem = items.find((i) => i && i.name === item.name)
            used[item.name] = {
              name: item.name,
              rowNumber: foundItem?.rowNumber || '-',
              quantity: 0,
              salePriceCents: item.salePriceCents,
            }
          }
          used[item.name].quantity += item.quantity
        })
      }
    })

    return used
  }, [usageHistory, items])

  const handleExportRemainingItems = useCallback(() => {
    const remainingItems = items.filter((item) => {
      const remaining =
        item.remainingAmount !== undefined
          ? item.remainingAmount
          : (item.originalAmount || item.amount || 0) - (item.usedAmount || 0)
      return remaining > 0
    })

    if (remainingItems.length === 0) {
      alert('Нет остатков для экспорта')
      return
    }

    const exportData = remainingItems.map((item) => {
      const remaining =
        item.remainingAmount !== undefined
          ? item.remainingAmount
          : (item.originalAmount || item.amount || 0) - (item.usedAmount || 0)

      return {
        Наименование: item.name,
        'Цена розничная': centsToStr(item.priceCents).replace('.', ','),
        'Цена со скидкой': centsToStr(item.salePriceCents).replace('.', ','),
        'Кол-во': remaining,
      }
    })

    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(exportData)
    XLSX.utils.book_append_sheet(wb, ws, 'Остатки')

    const now = new Date()
    const dateStr = now.toISOString().split('T')[0].replace(/-/g, '')
    const filename = `остатки_${dateStr}.xlsx`

    XLSX.writeFile(wb, filename)
  }, [items, centsToStr])

  const handleExportCalculations = useCallback(() => {
    const successfulCalculations = usageHistory.filter(
      (historyItem) => historyItem.solution && Array.isArray(historyItem.solution) && historyItem.solution.length > 0
    )

    if (successfulCalculations.length === 0) {
      alert('Нет успешных расчетов для экспорта')
      return
    }

    let htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        @page {
            size: A4;
            margin: 1.5cm 1cm;
        }
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 15px;
            line-height: 1.4;
            font-size: 10pt;
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #667eea;
            padding-bottom: 8px;
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 16pt;
        }
        .calculation {
            margin: 20px 0;
            padding: 12px;
            border: 1px solid #ddd;
            page-break-inside: avoid;
        }
        .calculation-header {
            font-size: 12pt;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
        }
        .calculation-total {
            font-weight: bold;
            margin-top: 8px;
            color: #333;
            font-size: 11pt;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
            table-layout: fixed;
            font-size: 9pt;
        }
        th, td {
            border: 1px solid #333;
            padding: 6px 4px;
            text-align: left;
            word-wrap: break-word;
        }
        th {
            background-color: #667eea;
            color: white;
            font-weight: bold;
            font-size: 9pt;
        }
        td {
            background-color: white;
        }
        tr:nth-child(even) td {
            background-color: #f2f2f2;
        }
        .col-name {
            width: 35%;
        }
        .col-price {
            width: 15%;
        }
        .col-sale-price {
            width: 15%;
        }
        .col-quantity {
            width: 12%;
            text-align: center;
        }
        .col-total {
            width: 23%;
            text-align: right;
        }
        .no-solution {
            color: #dc3545;
            font-style: italic;
        }
        @media print {
            body {
                margin: 0;
                padding: 10px;
            }
            .calculation {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <h1>Отчет по расчетам</h1>
    <p style="margin-bottom: 20px; font-size: 10pt;">Дата создания: ${new Date().toLocaleString('ru-RU')}</p>
`

    successfulCalculations.forEach((historyItem, index) => {
      const targetCents = historyItem.targetCents || 0

      htmlContent += `<div class="calculation">`
      htmlContent += `<div class="calculation-header">Расчет #${historyItem.calculationNumber || index + 1}: Целевая сумма ${centsToStr(targetCents)}</div>`

      let calculatedCents = 0
      historyItem.solution?.forEach((item) => {
        if (!item || typeof item !== 'object') return
        const unitCents = item.salePriceCents || 0
        const qty = item.quantity || 0
        calculatedCents += unitCents * qty
      })

      htmlContent += `<table>`
      htmlContent += `<thead><tr><th class="col-name">Наименование</th><th class="col-price">Цена</th><th class="col-sale-price">Цена со скидкой</th><th class="col-quantity">Кол-во</th><th class="col-total">Сумма</th></tr></thead>`
      htmlContent += `<tbody>`

      historyItem.solution?.forEach((item) => {
        if (!item || typeof item !== 'object' || !item.name) return
        const unitCents = item.salePriceCents || 0
        const qty = item.quantity || 0
        if (qty <= 0) return

        const originalItem = items.find((i) => i && i.name === item.name)
        const regularPriceCents = originalItem?.priceCents || unitCents
        const itemTotalCents = unitCents * qty

        htmlContent += `<tr>`
        htmlContent += `<td class="col-name">${item.name}</td>`
        htmlContent += `<td class="col-price">${centsToStr(regularPriceCents)}</td>`
        htmlContent += `<td class="col-sale-price">${centsToStr(unitCents)}</td>`
        htmlContent += `<td class="col-quantity">${qty}</td>`
        htmlContent += `<td class="col-total">${centsToStr(itemTotalCents)}</td>`
        htmlContent += `</tr>`
      })

      htmlContent += `</tbody>`
      htmlContent += `</table>`
      htmlContent += `<div class="calculation-total">Итого: ${centsToStr(calculatedCents)}</div>`
      htmlContent += `</div>`
    })

    htmlContent += `</body></html>`

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword;charset=utf-8;',
    })
    const link = document.createElement('a')
    const now = new Date()
    const dateStr = now.toISOString().split('T')[0].replace(/-/g, '')
    const filename = `отчет_по_расчетам_${dateStr}.doc`

    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
  }, [usageHistory, items, centsToStr])

  return {
    items,
    originalItems,
    usageHistory,
    loading,
    loadingText,
    failedCalculations,
    showNoSolutionModal,
    setShowNoSolutionModal,
    allUsedItems,
    handleFileUpload,
    handleCalculate,
    handleRemoveCalculation,
    handleReset,
    handleExportRemainingItems,
    handleExportCalculations,
    centsToStr,
  }
}
