import {
  FormControlLabel,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTranslation } from 'react-i18next';
import { Typography } from '@components';
import { useStyles } from '@hooks';
import { stylesheet } from './SumRow.styles';
import type { SumRowProps } from './SumRow.types';
import { useSumRow } from './SumRow.hooks';

const MINUS_ADORNMENT = <InputAdornment position="start">−</InputAdornment>;
const PLUS_ADORNMENT = <InputAdornment position="start">+</InputAdornment>;
const MINUS_SLOT_PROPS = {
  input: { startAdornment: MINUS_ADORNMENT },
  htmlInput: { inputMode: 'decimal' as const },
};
const PLUS_SLOT_PROPS = {
  input: { startAdornment: PLUS_ADORNMENT },
  htmlInput: { inputMode: 'decimal' as const },
};
const AMOUNT_SLOT_PROPS = {
  htmlInput: { inputMode: 'decimal' as const },
};

export const SumRow = (props: SumRowProps) => {
  const { row, index } = props;
  const { t } = useTranslation();
  const styles = useStyles(stylesheet);
  const {
    amountRef,
    range,
    statusLabel,
    isCalculated,
    handleAmountChange,
    handleMinusChange,
    handlePlusChange,
    handleSelectOnFocus,
    handleToggleApprox,
    handleRemove,
    handleKeyDown,
  } = useSumRow(props);

  return (
    <div css={[styles.container, isCalculated && styles.calculated]}>
      <div css={styles.row}>
        <Typography variant="bodySmall" color="muted" style={styles.index}>
          {index + 1}.
        </Typography>
        <TextField
          size="small"
          label={t('priceMatcher.prices.amountLabel')}
          value={row.amount}
          onChange={handleAmountChange}
          onKeyDown={handleKeyDown}
          inputRef={amountRef}
          slotProps={AMOUNT_SLOT_PROPS}
          css={styles.amount}
        />
        <FormControlLabel
          css={styles.approxToggle}
          control={
            <Switch
              size="small"
              checked={row.isApprox}
              onChange={handleToggleApprox}
            />
          }
          label={t('priceMatcher.prices.approx')}
        />
        {row.isApprox && (
          <>
            <TextField
              size="small"
              label={t('priceMatcher.prices.minusLabel')}
              value={row.minus}
              onChange={handleMinusChange}
              onFocus={handleSelectOnFocus}
              onKeyDown={handleKeyDown}
              slotProps={MINUS_SLOT_PROPS}
              css={styles.tolerance}
            />
            <TextField
              size="small"
              label={t('priceMatcher.prices.plusLabel')}
              value={row.plus}
              onChange={handlePlusChange}
              onFocus={handleSelectOnFocus}
              onKeyDown={handleKeyDown}
              slotProps={PLUS_SLOT_PROPS}
              css={styles.tolerance}
            />
          </>
        )}
        <IconButton
          size="small"
          aria-label={t('priceMatcher.prices.remove')}
          title={t('priceMatcher.prices.remove')}
          onClick={handleRemove}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </div>
      {(statusLabel ?? range) && (
        <div css={styles.meta}>
          {statusLabel && (
            <Typography variant="caption" color={statusLabel.color} bold>
              {statusLabel.text}
            </Typography>
          )}
          {range && (
            <Typography variant="caption" color="muted">
              {t('priceMatcher.prices.range', range)}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};
