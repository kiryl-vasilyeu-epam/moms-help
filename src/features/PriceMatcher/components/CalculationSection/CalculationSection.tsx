import { Box, Button, TextField } from '@mui/material'
import type { FC } from 'react'
import { styles } from './CalculationSection.styles'
import type { CalculationSectionProps } from './CalculationSection.types'
import { useCalculationSection } from './useCalculationSection'

export const CalculationSection: FC<CalculationSectionProps> = ({
  itemsCount,
  isLoading,
  onCalculate,
}) => {
  const { handleKeyDown, handleCalculateClick } = useCalculationSection({
    onCalculate,
  })

  return (
    <Box sx={styles.container}>
      {itemsCount > 0 && (
        <Box sx={styles.itemsCountBox}>
          ✓ Загружено {itemsCount} товаров
        </Box>
      )}

      <Box sx={styles.textFieldBox}>
        <TextField
          multiline
          rows={4}
          placeholder="Введите суммы для расчета (каждая на новой строке или через запятую)"
          onKeyDown={handleKeyDown}
          id="sumsInput"
          fullWidth
        />
      </Box>

      <Box sx={styles.buttonRow}>
        <Button
          variant="contained"
          onClick={handleCalculateClick}
          disabled={isLoading}
          sx={styles.calculateButton}
        >
          {isLoading ? '⏳ Вычисление...' : '🔍 Вычислить'}
        </Button>
      </Box>
    </Box>
  )
}
