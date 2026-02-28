import { Button } from '../Button';
import { styles } from './Screen.styles';
import { ScreenProps } from './Screen.types';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { IconButton } from '@mui/material';

export const Screen = ({
  children,
  title,
  uploadState,
  showUploadState,
  handleClear
}: ScreenProps) => {  
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div css={styles.container}>
      <div css={styles.header}>
        <h1>{title}</h1>

        {!showUploadState && (
          <div style={styles.buttonContainer}>
            <UploadFileIcon
              css={styles.uploadIcon}
              onClick={() => setIsModalOpen(true)}
            />
            <Button
              variant='close'
              isSmall
              onClick={handleClear}
            />
          </div>
        )}
 
      </div>
      {showUploadState ? (
        <div style={styles.uploadState}>
          {uploadState}
        </div>
      ) : children}

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <IconButton
          aria-label="close"
          onClick={() => setIsModalOpen(false)}
          css={styles.closeModalButton}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent css={styles.modal}>
          {uploadState}
        </DialogContent>
      </Dialog>
    </div>
  );
};