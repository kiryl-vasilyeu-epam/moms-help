import { styles } from './Screen.styles';
import { ScreenProps } from './Screen.types';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

export const Screen = ({
  children,
  title,
  settingsState,
  showSettingsState,
  isModalOpen,
  openModal,
  closeModal,
}: ScreenProps) => {  

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
        fullWidth={false}
        maxWidth={false}
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