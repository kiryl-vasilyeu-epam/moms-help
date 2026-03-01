import { centsToStr } from '@features/PriceMatcher/PriceMatcher.helpers';
import { styles } from './CalculationItem.styles';
import { Button } from '@components';
import { CalculationsItemProps } from './CalculationItem.types';

export const CalculationItem = ({
  calculation,
  index,
  handleCopyCalculation,
  handleRemoveCalculation,
}: CalculationsItemProps) => {
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
          Расчет #{calculation.calculationNumber}: {centsToStr(targetCents)}
          {isOff && (
            <span css={styles.offTargetLabel}>
              Расчитано: {centsToStr(calculatedCents)} | Разница:
              {centsToStr(differenceCents)}
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
          <h3 css={styles.solutionTitle}>Товары:</h3>
          <div css={styles.items}>
            {calculation.solution.map((item, itemIndex) => {
              const itemTotalCents = item.salePriceCents * item.quantity;
              const rowNum = item.rowNumber;
              return (
                <div key={itemIndex} css={styles.itemLi}>
                  -{item.quantity} шт. x {centsToStr(item.salePriceCents)} ={' '}
                  {centsToStr(itemTotalCents)} | {item.name} | строка {rowNum}
                </div>
              );
            })}
          </div>
          <div css={styles.total}>
            Итого: {centsToStr(calculatedCents)}
            {isOff && (
              <span css={styles.targetLabel}>
                (цель: {centsToStr(targetCents)})
              </span>
            )}
          </div>
        </div>
      ) : (
        <div css={styles.noSolution}>
          Точная комбинация не найдена для {centsToStr(targetCents)}
        </div>
      )}
    </div>
  );
};
