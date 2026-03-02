import { TextField, InputAdornment } from '@mui/material';
import { DiscountInputProps } from './DiscountInput.types';
import { styles } from './DiscountInput.styles';
import { Button } from '@components';
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
      <span>
        {t('priceMatcher.discount.currentPercent', {
          percent: discountPercent,
        })}
      </span>
      <div css={styles.newPercent}>
        <span>{t('priceMatcher.discount.setNewPercent')}</span>
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
