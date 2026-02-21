import { Box, Paper, Typography } from '@mui/material'
import type { FC } from 'react'
import { styles } from './StatsSection.styles'
import type { StatsSectionProps } from './StatsSection.types'
import { useStatsSection } from './useStatsSection'

export const StatsSection: FC<StatsSectionProps> = ({ stats }) => {
  const { statItems } = useStatsSection(stats)

  return (
    <Box sx={styles.container}>
      {statItems.map((item) => (
        <Paper key={item.label} sx={styles.statPaper}>
          <Typography variant="caption" sx={styles.statLabel}>
            {item.label}
          </Typography>
          <Typography variant="h5" sx={styles.statValue}>
            {item.value}
          </Typography>
        </Paper>
      ))}
    </Box>
  )
}
