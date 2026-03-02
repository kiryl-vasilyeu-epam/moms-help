import { centsToStr } from '@features/PriceMatcher/PriceMatcher.helpers';
import { styleSheet } from './CalculationItem.styles';
import { Button, Typography } from '@components';
import { CalculationsItemProps } from './CalculationItem.types';
import { useTranslation } from 'react-i18next';
import { useStyles } from '@hooks';

export const CalculationItem = ({
  calculation,
  index,
  handleCopyCalculation,
  handleRemoveCalculation,
}: CalculationsItemProps) => {
  const { t } = useTranslation();
  const targetCents = calculation.targetCents || 0;
  const calculatedCents = calculation.calculatedCents ?? 0;
  const differenceCents = Math.abs(calculatedCents - targetCents);
  const isOff = calculatedCents > 0 && differenceCents !== 0;
  const onCopy = () => handleCopyCalculation(index);
  const styles = useStyles(styleSheet);

  return (
    <div
      key={index}
      css={[
        styles.card,
        isOff && styles.cardOffTarget,
        !calculation.solution && styles.cardNoSolution,
      ]}
      onClick={onCopy}
    >
      <div css={styles.header}>
        <div css={styles.title}>
          <Typography variant="body">
            {t('priceMatcher.calculations.calculationNumber', {
              number: calculation.calculationNumber,
              sum: centsToStr(targetCents),
            })}
          </Typography>
          {isOff && (
            <Typography
              variant="caption"
              color="warning"
              style={styles.offTargetLabel}
            >
              {t('priceMatcher.calculations.calculated', {
                calculated: centsToStr(calculatedCents),
                diff: centsToStr(differenceCents),
              })}
            </Typography>
          )}
        </div>
        <Button
          onClick={handleRemoveCalculation(index)}
          variant="close"
          isSmall
        />
      </div>

      {calculation.solution && calculation.solution.length > 0 ? (
        <div css={styles.solutionSection}>
          <Typography variant="h5" style={styles.solutionTitle}>
            {t('priceMatcher.calculations.items')}
          </Typography>
          <div css={styles.items}>
            {calculation.solution.map((item, itemIndex) => {
              const itemTotalCents = item.salePriceCents * item.quantity;
              const rowNum = item.rowNumber;
              return (
                <div key={itemIndex} css={styles.itemLi}>
                  -{item.quantity} {t('priceMatcher.calculations.pcs')} x{' '}
                  {centsToStr(item.salePriceCents)} ={' '}
                  {centsToStr(itemTotalCents)} | {item.name} |{' '}
                  {t('priceMatcher.calculations.row')} {rowNum}
                </div>
              );
            })}
          </div>
          <Typography variant="body" bold style={styles.total}>
            {t('priceMatcher.calculations.total', {
              sum: centsToStr(calculatedCents),
            })}
            {isOff && (
              <Typography variant="caption" style={styles.targetLabel}>
                {t('priceMatcher.calculations.target', {
                  sum: centsToStr(targetCents),
                })}
              </Typography>
            )}
          </Typography>
        </div>
      ) : (
        <Typography variant="body" color="danger" style={styles.noSolution}>
          {t('priceMatcher.calculations.noSolution', {
            sum: centsToStr(targetCents),
          })}
        </Typography>
      )}
    </div>
  );
};
