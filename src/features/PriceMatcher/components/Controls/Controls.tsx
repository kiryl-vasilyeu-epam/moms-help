import { Button } from '@components';
import { stylesheet } from './Controls.styles';
import type { ControlsProps } from './Controls.types';
import { useTranslation } from 'react-i18next';
import { useStyles } from '@hooks';

export const Controls = ({
  onExportRemainingItems,
  onExportCalculations,
  handleCalculationOpen,
  handleOpenResults,
}: ControlsProps) => {
  const { t } = useTranslation();
  const styles = useStyles(stylesheet);
  return (
    <div css={styles.container}>
      <div css={styles.group}>
        <Button
          style={styles.button}
          variant="soft"
          onClick={handleCalculationOpen}
        >
          {t('priceMatcher.controls.showCalculations')}
        </Button>
        <Button
          style={styles.button}
          variant="soft"
          onClick={handleOpenResults}
        >
          {t('priceMatcher.controls.showSummary')}
        </Button>
      </div>
      <div css={styles.group}>
        <Button
          style={styles.button}
          variant="outline"
          onClick={onExportRemainingItems}
        >
          {t('priceMatcher.controls.downloadRemaining')}
        </Button>
        <Button
          style={styles.button}
          variant="outline"
          onClick={onExportCalculations}
        >
          {t('priceMatcher.controls.downloadReport')}
        </Button>
      </div>
    </div>
  );
};
