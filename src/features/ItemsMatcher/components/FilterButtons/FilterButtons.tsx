import { Box, Button } from '@mui/material'
import type { FC } from 'react'
import { FILTER_LABELS } from '../../ItemsMatcher.constants'
import { styles } from './FilterButtons.styles'
import type { FilterButtonsProps } from './FilterButtons.types'
import { useFilterButtons } from './useFilterButtons'

export const FilterButtons: FC<FilterButtonsProps> = ({ currentFilter, onFilterChange }) => {
  const { filters } = useFilterButtons()

  return (
    <Box sx={styles.container}>
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={currentFilter === filter ? 'contained' : 'outlined'}
          onClick={() => onFilterChange(filter)}
          sx={currentFilter === filter ? styles.filterButtonSelected : styles.filterButton}
        >
          {FILTER_LABELS[filter]}
        </Button>
      ))}
    </Box>
  )
}
