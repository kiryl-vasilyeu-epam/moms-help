import { styleSheet } from './NoSolutionModal.styles';
import type { NoSolutionModalProps } from './NoSolutionModal.types';
import { centsToStr } from '../../PriceMatcher.helpers';
import { DialogContent, Dialog, DialogTitle, IconButton } from '@mui/material';
import { useMemo } from 'react';
import ReportIcon from '@mui/icons-material/Report';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { Typography } from '@components';
import { useStyles } from '@hooks';

export const NoSolutionModal = ({
  open,
  onClose,
  failedCalculations,
}: NoSolutionModalProps) => {
  const styles = useStyles(styleSheet);
  const { t } = useTranslation();

  const NO_SOLUTION_MESSAGES = useMemo(
    () => ({
      no_items: {
        prefix: t('priceMatcher.noSolution.noItems.prefix'),
        suffix: t('priceMatcher.noSolution.noItems.suffix'),
      },
      no_combination: {
        prefix: t('priceMatcher.noSolution.noCombination.prefix'),
        suffix: t('priceMatcher.noSolution.noCombination.suffix'),
      },
    }),
    [t],
  );

  const messages = useMemo(
    () =>
      failedCalculations.map((calculation) => ({
        sum: centsToStr(calculation.targetCents),
        ...NO_SOLUTION_MESSAGES[calculation.reason],
      })),
    [failedCalculations, NO_SOLUTION_MESSAGES],
  );

  return (
    <Dialog fullWidth open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle css={styles.title}>
        {t('common.attention')}
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent css={styles.container}>
        {messages.map((message, index) => (
          <div key={index} css={styles.combination}>
            <ReportIcon color="error" css={styles.reportIcon} />
            <div>
              <div>
                <Typography color="alwaysBlack" variant="body">
                  {message.prefix}{' '}
                </Typography>
                <Typography
                  color="alwaysBlack"
                  variant="body"
                  bold
                  style={styles.sumValue}
                >
                  {message.sum}
                </Typography>
              </div>
              <Typography
                variant="bodySmall"
                color="muted"
                style={styles.suffix}
              >
                {message.suffix}
              </Typography>
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};
