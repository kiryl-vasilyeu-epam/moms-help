import { Box } from '@mui/material'
import type { FC } from 'react'
import { styles } from './LoadingOverlay.styles'
import type { LoadingOverlayProps } from './LoadingOverlay.types'

const LoadingOverlay: FC<LoadingOverlayProps> = ({ loadingText }) => {
  return (
    <Box sx={styles.overlay}>
      <Box sx={styles.content}>
        <div style={styles.text as React.CSSProperties}>{loadingText}</div>
        <div style={styles.progress as React.CSSProperties}>Пожалуйста, подождите...</div>
      </Box>
    </Box>
  )
}

export default LoadingOverlay
