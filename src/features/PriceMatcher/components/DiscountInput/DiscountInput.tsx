import { TextField, InputAdornment } from '@mui/material';
import { DiscountInputProps } from './DiscountInput.types';
import { stylesheet } from './DiscountInput.styles';
import { Button, Typography } from '@components';
import { useTranslation } from 'react-i18next';
import { useStyles } from '@hooks';

const SLOT_PROPS = {
  input: {
    endAdornment: <InputAdornment position="end">%</InputAdornment>,
  },
};

export const DiscountInput = ({
  discountPercent,
  discountInputValue,
  setDiscountInputValue,
  onRecalculate,
}: DiscountInputProps) => {
  const { t } = useTranslation();
  const styles = useStyles(stylesheet);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 0 || value > 100) {
      return;
    }
    setDiscountInputValue(String(value));
  };
  const isChanged = discountInputValue !== String(discountPercent);

  return (
    <div css={styles.container}>
      <div css={styles.row}>
        <Typography variant="body" bold>
          {t('priceMatcher.discount.label')}
        </Typography>
        <TextField
          type="number"
          size="small"
          value={discountInputValue}
          onChange={handleChange}
          css={styles.input}
          slotProps={SLOT_PROPS}
        />
        <Button variant="info" onClick={onRecalculate} disabled={!isChanged}>
          {t('priceMatcher.discount.recalculate')}
        </Button>
      </div>
      <Typography variant="caption" color={isChanged ? 'warning' : 'muted'}>
        {isChanged
          ? t('priceMatcher.discount.changedHint', { percent: discountPercent })
          : t('priceMatcher.discount.currentPercent', {
              percent: discountPercent,
            })}
      </Typography>
    </div>
  );
};
