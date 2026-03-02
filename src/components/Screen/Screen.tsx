import { stylesheet } from './Screen.styles';
import { ScreenProps } from './Screen.types';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { Typography } from '../Typography';
import { useStyles } from '@hooks';

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
  const styles = useStyles(stylesheet);

  return (
    <div css={styles.container}>
      <div css={styles.header}>
        <Typography variant="h1">{title}</Typography>

        {!showSettingsState && (
          <SettingsBackupRestoreIcon
            css={styles.uploadIcon}
            onClick={openModal}
          />
        )}
      </div>
      {showSettingsState ? (
        <div css={styles.uploadState}>{settingsState}</div>
      ) : (
        children
      )}

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
        <DialogContent css={styles.modal}>{settingsState}</DialogContent>
      </Dialog>
    </div>
  );
};
