import { TextField, InputAdornment } from '@mui/material';
import { DiscountInputProps } from './DiscountInput.types';
import { styles } from './DiscountInput.styles';
import { Button } from '@components';

export const DiscountInput = ({
  discountPercent,
  discountInputValue,
  setDiscountInputValue,
}: DiscountInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 0 || value > 100) {
      return;
    }
    setDiscountInputValue(String(value));
  };
  console.log({ discountPercent });

  return (
    <div style={styles.container}>
      <span>Текущий процент скидки: {discountPercent}%</span>
      <div style={styles.newPercent}>
        <span>Установить новый процент скидки:</span>
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
        <Button disabled={discountInputValue === String(discountPercent)}>
          Пересчитать
        </Button>
      </div>
    </div>
  );
};
