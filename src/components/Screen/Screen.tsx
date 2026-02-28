import { styles } from './Screen.styles';
import { ScreenProps } from './Screen.types';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { IconButton } from '@mui/material';

export const Screen = ({
  children,
  title,
  settingsState,
  showSettingsState,
}: ScreenProps) => {  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div css={styles.container}>
      <div css={styles.header}>
        <h1>{title}</h1>

        {!showSettingsState && (
          <SettingsBackupRestoreIcon
            css={styles.uploadIcon}
            onClick={openModal}
          />
        )}
 
      </div>
      {showSettingsState ? (
        <div style={styles.uploadState}>
          {settingsState}
        </div>
      ) : children}

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
      >
        <IconButton
          aria-label="close"
          onClick={closeModal}
          css={styles.closeModalButton}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent css={styles.modal}>
          {settingsState}
        </DialogContent>
      </Dialog>
    </div>
  );
};