import { Box, Typography } from '@mui/material'
import { styles } from './ItemsMatcher.styles'

const ItemsMatcher = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Typography variant="h3" sx={styles.title}>
          📦 Совпадение артикулов
        </Typography>
        <Typography variant="h6" sx={styles.subtitle}>
          Вкладка для сравнения артикулов между системами
        </Typography>
      </Box>
    </Box>
  )
}

export default ItemsMatcher
