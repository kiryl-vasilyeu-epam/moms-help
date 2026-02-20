import { Box, Typography } from '@mui/material'
import { styles } from './PriceMatcher.styles'

const PriceMatcher = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Typography variant="h3" sx={styles.title}>
          💰 Поиск цен
        </Typography>
        <Typography variant="h6" sx={styles.subtitle}>
          Вкладка для расчёта и поиска цен
        </Typography>
      </Box>
    </Box>
  )
}

export default PriceMatcher
