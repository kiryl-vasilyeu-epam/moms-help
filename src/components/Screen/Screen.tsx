import { stylesheet } from './Screen.styles';
import { ScreenProps } from './Screen.types';
import { useTranslation } from 'react-i18next';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { useStyles } from '@hooks';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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
  const { t } = useTranslation();

  return (
    <div css={styles.container}>
      <div css={styles.header}>
        <Typography variant="h1">{title}</Typography>

        {!showSettingsState && (
          <Button variant="soft" style={styles.fileButton} onClick={openModal}>
            📂 {t('common.fileAndSettings')}
          </Button>
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
        slotProps={{
          paper: {
            sx: styles.modalContainer,
          },
        }}
      >
        <DialogTitle css={styles.modalTitle}>
          {t('common.fileAndSettings')}
          <IconButton aria-label="close" onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent css={styles.modal}>{settingsState}</DialogContent>
      </Dialog>
    </div>
  );
};
