import { styles } from './NoSolutionModal.styles';
import type { NoSolutionModalProps } from './NoSolutionModal.types';
import { centsToStr } from '../../PriceMatcher.helpers';
import { DialogContent, Dialog, DialogTitle, IconButton } from '@mui/material';
import { useMemo } from 'react';
import ReportIcon from '@mui/icons-material/Report';
import CloseIcon from '@mui/icons-material/Close';

const NO_SOLUTION_MESSAGES = {
  no_items: {
    prefix: 'Не удалось найти комбинацию для суммы ',
    suffix: 'Нет доступных товаров для расчета.',
  },
  no_combination: {
    prefix: 'Не удалось найти точную комбинацию для суммы',
    suffix:
      'Попробуйте изменить сумму, скидку, или проверьте доступные товары.',
  },
};

export const NoSolutionModal = ({
  open,
  onClose,
  failedCalculations,
}: NoSolutionModalProps) => {
  const messages = useMemo(
    () =>
      failedCalculations.map((calculation) => ({
        sum: centsToStr(calculation.targetCents),
        ...NO_SOLUTION_MESSAGES[calculation.reason],
      })),
    [failedCalculations],
  );

  return (
    <Dialog fullWidth open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle css={styles.title}>
        Внимание
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent css={styles.container}>
        {messages.map((message, index) => (
          <div key={index} style={styles.combination}>
            <ReportIcon color="error" style={{ marginRight: '8px' }} />
            <div>
              <div>
                <span>{message.prefix} </span>
                <span css={styles.sumValue}>{message.sum}</span>
              </div>
              <span css={styles.suffix}>{message.suffix}</span>
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};
