import { Box, Button } from '@mui/material'
import { useMemo } from 'react'
import { styles } from './ResultsSection.styles'
import type { ResultsSectionProps } from './ResultsSection.types'
import type { AllUsedItems } from '../../PriceMatcher.types'

const ResultsSection = ({
  usageHistory,
  items,
  onRemoveCalculation,
  centsToStr,
  onExportRemainingItems,
  onExportCalculations,
}: ResultsSectionProps) => {
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

  const handleCopyCalculation = (index: number) => {
    if (index < 0 || index >= usageHistory.length) return

    const calculation = usageHistory[index]
    const targetCents = calculation.targetCents || 0
    let textToCopy = `Расчет #${calculation.calculationNumber || index + 1}\n`
    textToCopy += `Целевая сумма: ${centsToStr(targetCents)}\n\n`

    if (calculation.solution && calculation.solution.length > 0) {
      textToCopy += `Товары:\n`
      calculation.solution.forEach((item) => {
        const rowNum = item.rowNumber || items.find((i) => i.name === item.name)?.rowNumber || '-'
        const itemTotalCents = (item.salePriceCents || 0) * item.quantity
        textToCopy += `${item.quantity} шт. (строка ${rowNum}) ${item.name} @ ${centsToStr(item.salePriceCents)} = ${centsToStr(itemTotalCents)}\n`
      })

      const totalCents = calculation.calculatedCents || 0
      textToCopy += `\nИтого: ${centsToStr(totalCents)}\n`
    } else {
      textToCopy += `Точная комбинация не найдена\n`
    }

    navigator.clipboard.writeText(textToCopy)
  }

  return (
    <Box sx={styles.resultsSection}>
      {usageHistory.map((calculation, index) => {
        const targetCents = calculation.targetCents || 0
        const calculatedCents = calculation.calculatedCents || 0
        const differenceCents = Math.abs(calculatedCents - targetCents)
        const isOff = calculatedCents > 0 && differenceCents !== 0

        const cardStyle = isOff
          ? { ...styles.resultCard, ...styles.resultCardOffTarget }
          : styles.resultCard

        return (
          <Box
            key={index}
            sx={cardStyle}
            onClick={() => handleCopyCalculation(index)}
          >
            <div style={styles.resultHeader as React.CSSProperties}>
              <span>
                Расчет #{calculation.calculationNumber || index + 1}: {centsToStr(targetCents)}
                {isOff && (
                  <span style={{ marginLeft: '10px', color: '#ff9800' }}>
                    (получено: {centsToStr(calculatedCents)}, разница: {centsToStr(differenceCents)})
                  </span>
                )}
              </span>
              <button
                style={styles.deleteButton as React.CSSProperties}
                onClick={(e) => {
                  e.stopPropagation()
                  if (confirm(`Удалить расчет #${calculation.calculationNumber || index + 1}?`)) {
                    onRemoveCalculation(index)
                  }
                }}
              >
                ×
              </button>
            </div>

            {calculation.solution && calculation.solution.length > 0 ? (
              <div style={styles.solutionSection as React.CSSProperties}>
                <h3 style={styles.solutionTitle as React.CSSProperties}>Товары для выбора:</h3>
                <ul style={styles.resultItems as React.CSSProperties}>
                  {calculation.solution.map((item, itemIndex) => {
                    if (!item || typeof item !== 'object' || !item.name || (item.quantity || 0) <= 0) return null
                    const itemTotalCents = (item.salePriceCents || 0) * (item.quantity || 0)
                    const rowNum = item.rowNumber || items.find((i) => i.name === item.name)?.rowNumber || '-'
                    return (
                      <li key={itemIndex} style={styles.resultItemLi as React.CSSProperties}>
                        {item.quantity} шт. (строка {rowNum}) {item.name} @ {centsToStr(item.salePriceCents)} ={' '}
                        {centsToStr(itemTotalCents)}
                      </li>
                    )
                  })}
                </ul>
                <div style={styles.resultTotal as React.CSSProperties}>
                  Итого: {centsToStr(calculatedCents)}
                  {isOff && <span style={{ marginLeft: '10px' }}>(цель: {centsToStr(targetCents)})</span>}
                </div>
              </div>
            ) : (
              <div style={styles.noSolution as React.CSSProperties}>
                Точная комбинация не найдена для {centsToStr(targetCents)}
              </div>
            )}
          </Box>
        )
      })}

      {Object.keys(allUsedItems).length > 0 && (
        <Box sx={styles.summaryCard}>
          <div style={styles.summaryTitle as React.CSSProperties}>📋 Сводка - Товары к удалению</div>
          <ul style={styles.resultItems as React.CSSProperties}>
            {Object.values(allUsedItems).map((item, index) => (
              <li key={index} style={styles.resultItemLi as React.CSSProperties}>
                <strong>{item.quantity} шт.</strong> (строка {item.rowNumber}) {item.name}
              </li>
            ))}
          </ul>
        </Box>
      )}

      {usageHistory.length > 0 && (
        <Box sx={styles.exportButtonsContainer}>
          <Button
            variant="contained"
            onClick={onExportRemainingItems}
            sx={styles.exportButton}
          >
            📥 Скачать остатки (XLSX)
          </Button>
          <Button
            variant="contained"
            onClick={onExportCalculations}
            sx={styles.exportButton}
          >
            📄 Скачать отчет (DOC)
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default ResultsSection
