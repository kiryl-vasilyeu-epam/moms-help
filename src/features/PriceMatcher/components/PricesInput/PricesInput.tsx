import { Button } from '@components';
import { styles } from './PricesInput.styles';
import { PricesInputProps } from './PricesInput.types';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const PricesInput = ({
  prices,
  setPrices,
  handleCalculate,
}: PricesInputProps) => {
  const { t } = useTranslation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrices(e.target.value);
  };
  const onCalculate = () => handleCalculate();

  return (
    <div css={styles.container}>
      <TextField
        fullWidth
        label={t('priceMatcher.prices.inputLabel')}
        value={prices}
        onChange={handleChange}
        multiline
        rows={3}
      />
      <Button onClick={onCalculate}>
        {t('priceMatcher.prices.calculate')}
      </Button>
    </div>
  );
};
