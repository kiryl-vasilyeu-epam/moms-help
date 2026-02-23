import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SendIcon from '@mui/icons-material/Send';
import type { FC } from 'react';
import { BUTTON_LABELS } from '../../ItemsMatcher.constants';
import { styles } from './ActionButtons.styles';
import { useActionButtons } from './useActionButtons';
import { ActionButtonsProps } from './ActionButtons.types';

export const ActionButtons: FC<ActionButtonsProps> = ({ results, show }) => {
  const { handleDownload, handleTransfer } = useActionButtons(results);
  if (!show) return null;

  return (
    <Box sx={styles.container}>
      <Button
        fullWidth
        variant="contained"
        startIcon={<FileDownloadIcon />}
        onClick={handleDownload}
        sx={styles.downloadButton}
      >
        {BUTTON_LABELS.download}
      </Button>
      <Button
        fullWidth
        variant="contained"
        startIcon={<SendIcon />}
        onClick={handleTransfer}
        sx={styles.transferButton}
      >
        {BUTTON_LABELS.transfer}
      </Button>
    </Box>
  );
};
