import { Box, Typography, Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import type { FC } from 'react'
import { FILE_ACCEPT_TYPES, SECTION_TITLES, BUTTON_LABELS } from '../../ItemsMatcher.constants'
import { styles } from './FileUploadSection.styles'
import type { FileUploadSectionProps } from './FileUploadSection.types'
import { useFileUploadSection } from './useFileUploadSection'

export const FileUploadSection: FC<FileUploadSectionProps> = ({
  file1Name,
  file2Name,
  onFile1Change,
  onFile2Change
}) => {
  const { handleFile1Input, handleFile2Input } = useFileUploadSection({
    onFile1Change,
    onFile2Change,
  })

  return (
    <Box sx={styles.container}>
      <Box sx={styles.uploadBox}>
        <Typography variant="h6" sx={styles.fileTitle}>
          {SECTION_TITLES.file1}
        </Typography>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={styles.fileButton}
        >
          {BUTTON_LABELS.selectFile1}
          <input type="file" accept={FILE_ACCEPT_TYPES} onChange={handleFile1Input} hidden />
        </Button>
        <Typography variant="caption" sx={styles.fileName}>
          {file1Name}
        </Typography>
      </Box>

      <Box sx={styles.uploadBox}>
        <Typography variant="h6" sx={styles.fileTitle}>
          {SECTION_TITLES.file2}
        </Typography>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={styles.fileButton}
        >
          {BUTTON_LABELS.selectFile2}
          <input type="file" accept={FILE_ACCEPT_TYPES} onChange={handleFile2Input} hidden />
        </Button>
        <Typography variant="caption" sx={styles.fileName}>
          {file2Name}
        </Typography>
      </Box>
    </Box>
  )
}
