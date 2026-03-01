import { styles } from './Calculations.styles';
import type { CalculationsProps } from './Calculations.types';
import { useCalculations } from './Calculations.hooks';
import { DialogContent, Dialog, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CalculationItem } from '../CalculationItem';

export const Calculations = ({
  usageHistory,
  items,
  onRemoveCalculation,
  calculationsOpen,
  handleCalculationClose,
}: CalculationsProps) => {
  const { handleCopyCalculation } = useCalculations(usageHistory, items);
  const handleRemoveCalculation = (index: number) => () => {
    if (
      confirm(
        `Удалить расчет #${usageHistory[index].calculationNumber || index + 1}?`,
      )
    ) {
      onRemoveCalculation(index);
    }
  };

  return (
    <Dialog
      open={calculationsOpen}
      onClose={handleCalculationClose}
      maxWidth="lg"
    >
      <DialogTitle css={styles.modalTitle}>
        Список расчетов
        <IconButton aria-label="close" onClick={handleCalculationClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent css={styles.container}>
        {usageHistory.map((calculation, index) => (
          <CalculationItem
            key={index}
            calculation={calculation}
            index={index}
            handleCopyCalculation={handleCopyCalculation}
            handleRemoveCalculation={handleRemoveCalculation}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
};
