import { centsToStr } from '@features/PriceMatcher/PriceMatcher.helpers';
import { styles } from './CalculationItem.styles';
import { Button } from '@components';
import { CalculationsItemProps } from './CalculationItem.types';
import { useTranslation } from 'react-i18next';

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
          {t('priceMatcher.calculations.calculationNumber', {
            number: calculation.calculationNumber,
            sum: centsToStr(targetCents),
          })}
          {isOff && (
            <span css={styles.offTargetLabel}>
              {t('priceMatcher.calculations.calculated', {
                calculated: centsToStr(calculatedCents),
                diff: centsToStr(differenceCents),
              })}
            </span>
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
          <h3 css={styles.solutionTitle}>
            {t('priceMatcher.calculations.items')}
          </h3>
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
          <div css={styles.total}>
            {t('priceMatcher.calculations.total', {
              sum: centsToStr(calculatedCents),
            })}
            {isOff && (
              <span css={styles.targetLabel}>
                {t('priceMatcher.calculations.target', {
                  sum: centsToStr(targetCents),
                })}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div css={styles.noSolution}>
          {t('priceMatcher.calculations.noSolution', {
            sum: centsToStr(targetCents),
          })}
        </div>
      )}
    </div>
  );
};
