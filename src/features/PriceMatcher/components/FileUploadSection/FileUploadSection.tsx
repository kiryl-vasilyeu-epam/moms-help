import { Box, Button, IconButton, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import type { FC } from 'react'
import { styles } from './FileUploadSection.styles'
import type { FileUploadSectionProps } from './FileUploadSection.types'
import { useFileUploadSection } from './useFileUploadSection'
import ClearIcon from '@mui/icons-material/Clear'

export const FileUploadSection: FC<FileUploadSectionProps> = ({
  fileName,
  onFileChange,
  onReset,
  isDisabled
}) => {
  const { handleFileInput } = useFileUploadSection({
    onFileChange,
  })

  return (
    <Box sx={styles.container}>
        <Box sx={styles.uploadBox}>
            <Typography variant="h6" sx={styles.fileTitle}>
                Остатки
            </Typography>
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={styles.fileButton}
            >
                Загрузить файл
                <input type="file" accept='.xlsx,.xls' onChange={handleFileInput} hidden />
            </Button>
            <Typography variant="caption" sx={styles.fileName}>
                {fileName}
            </Typography>
        </Box>

        {!isDisabled && (
            <Button
                fullWidth
                variant='contained'
                color='error'
                onClick={onReset}
                endIcon={<ClearIcon />}
                sx={styles.clearButton}
                >
                Очистить данные
            </Button>
        )}

    </Box>
  )
}
