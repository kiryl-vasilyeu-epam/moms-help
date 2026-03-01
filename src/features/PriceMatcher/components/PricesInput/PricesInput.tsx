import { Button } from '@components';
import { styles } from './PricesInput.styles';
import { PricesInputProps } from './PricesInput.types';
import { TextField } from '@mui/material';

export const PricesInput = ({
  prices,
  setPrices,
  handleCalculate,
}: PricesInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrices(e.target.value);
  };

  return (
    <div css={styles.container}>
      <TextField
        fullWidth
        label="Введите желаемые цены через запятую: 100.21, 23.11..."
        value={prices}
        onChange={handleChange}
        multiline
        rows={3}
      />
      <Button onClick={handleCalculate}>Расчитать</Button>
    </div>
  );
};
