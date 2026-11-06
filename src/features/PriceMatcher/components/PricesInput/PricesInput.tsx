import { Button, Typography } from '@components';
import {
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useStyles } from '@hooks';
import { stylesheet } from './PricesInput.styles';
import type { PricesInputProps } from './PricesInput.types';
import { usePricesInput } from './PricesInput.hooks';
import { SumRow } from '../SumRow';

export const PricesInput = (props: PricesInputProps) => {
  const { t } = useTranslation();
  const styles = useStyles(stylesheet);
  const {
    isOpen,
    rowViews,
    focusId,
    pendingCount,
    handleOpen,
    handleClose,
    handleChangeRow,
    handleToggleApprox,
    handleRemoveRow,
    handleAddRow,
    handleEnter,
    handleReset,
    handleSubmit,
  } = usePricesInput(props);

  return (
    <div css={styles.container}>
      <Badge
        badgeContent={pendingCount}
        color="error"
        max={99}
        title={t('priceMatcher.prices.pending', { count: pendingCount })}
        css={styles.badge}
      >
        <Button style={styles.openButton} onClick={handleOpen}>
          {t('priceMatcher.prices.openInput')}
        </Button>
      </Badge>

      <Dialog fullWidth maxWidth="md" open={isOpen} onClose={handleClose}>
        <DialogTitle css={styles.modalTitle}>
          {t('priceMatcher.prices.modalTitle')}
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent css={styles.content}>
          <Typography variant="bodySmall" color="muted">
            {t('priceMatcher.prices.hint')}
          </Typography>
          <div css={styles.rows}>
            {rowViews.map(({ row, status }, index) => (
              <SumRow
                key={row.id}
                row={row}
                status={status}
                index={index}
                shouldFocus={row.id === focusId}
                onChange={handleChangeRow}
                onToggleApprox={handleToggleApprox}
                onRemove={handleRemoveRow}
                onEnter={handleEnter}
                onSubmit={handleSubmit}
              />
            ))}
          </div>
          <Button
            variant="soft"
            isSmall
            style={styles.addRow}
            onClick={handleAddRow}
          >
            {t('priceMatcher.prices.addRow')}
          </Button>
        </DialogContent>
        <DialogActions css={styles.actions}>
          <Button
            variant="outline"
            disabled={pendingCount === 0}
            onClick={handleReset}
          >
            {t('priceMatcher.prices.reset')}
          </Button>
          <Button
            variant="success"
            disabled={pendingCount === 0}
            onClick={handleSubmit}
          >
            {t('priceMatcher.prices.calculateCount', { count: pendingCount })}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
