import { Button } from '@components';
import { styles } from './Controls.styles';
import type { ControlsProps } from './Controls.types';
import { useTranslation } from 'react-i18next';

export const Controls = ({
  onExportRemainingItems,
  onExportCalculations,
  handleCalculationOpen,
  handleOpenResults,
}: ControlsProps) => {
  const { t } = useTranslation();
  return (
    <div css={styles.container}>
      <div css={styles.row}>
        <Button
          style={styles.button}
          variant="primary"
          onClick={onExportRemainingItems}
        >
          {t('priceMatcher.controls.downloadRemaining')}
        </Button>
        <Button
          style={styles.button}
          variant="primary"
          onClick={onExportCalculations}
        >
          {t('priceMatcher.controls.downloadReport')}
        </Button>
      </div>
      <div css={styles.row}>
        <Button
          style={styles.button}
          variant="info"
          onClick={handleCalculationOpen}
        >
          {t('priceMatcher.controls.showCalculations')}
        </Button>

        <Button
          style={styles.button}
          variant="info"
          onClick={handleOpenResults}
        >
          {t('priceMatcher.controls.showSummary')}
        </Button>
      </div>
    </div>
  );
};
