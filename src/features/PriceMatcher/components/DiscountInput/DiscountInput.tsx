import { TextField, InputAdornment } from '@mui/material';
import { DiscountInputProps } from './DiscountInput.types';
import { styles } from './DiscountInput.styles';
import { Button, Typography } from '@components';
import { useTranslation } from 'react-i18next';

export const DiscountInput = ({
  discountPercent,
  discountInputValue,
  setDiscountInputValue,
  onRecalculate,
}: DiscountInputProps) => {
  const { t } = useTranslation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 0 || value > 100) {
      return;
    }
    setDiscountInputValue(String(value));
  };

  return (
    <div css={styles.container}>
      <Typography variant="body">
        {t('priceMatcher.discount.currentPercent', {
          percent: discountPercent,
        })}
      </Typography>
      <div css={styles.newPercent}>
        <div css={styles.inputGroup}>
          <Typography variant="body">
            {t('priceMatcher.discount.setNewPercent')}
          </Typography>
          <TextField
            type="number"
            size="small"
            value={discountInputValue}
            onChange={handleChange}
            css={styles.input}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              },
            }}
          />
        </div>
        <Button
          variant="info"
          onClick={onRecalculate}
          disabled={discountInputValue === String(discountPercent)}
        >
          {t('priceMatcher.discount.recalculate')}
        </Button>
      </div>
    </div>
  );
};
