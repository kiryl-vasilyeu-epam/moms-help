import { Button } from '@components';
import { styles } from './Controls.styles';
import type { ControlsProps } from './Controls.types';

export const Controls = ({
  onExportRemainingItems,
  onExportCalculations,
  handleCalculationOpen,
  handleOpenResults,
}: ControlsProps) => {
  return (
    <div css={styles.container}>
      <div css={styles.row}>
        <Button
          style={styles.button}
          variant="primary"
          onClick={onExportRemainingItems}
        >
          📥 Скачать остатки (XLSX)
        </Button>
        <Button
          style={styles.button}
          variant="primary"
          onClick={onExportCalculations}
        >
          📄 Скачать отчет (DOC)
        </Button>
      </div>
      <div css={styles.row}>
        <Button
          style={styles.button}
          variant="info"
          onClick={handleCalculationOpen}
        >
          📊 Показать расчеты
        </Button>

        <Button
          style={styles.button}
          variant="info"
          onClick={handleOpenResults}
        >
          📈 Показать сводку
        </Button>
      </div>
    </div>
  );
};
