import { useTranslation } from 'react-i18next';
import { Button } from '@components';
import { styles } from './ProcessControls.styles';
import { ProcessControlsProps } from './ProcessControls.types';

export const ProcessControls = ({
  isProcessDisabled,
  handleProcess,
  handleClear,
}: ProcessControlsProps) => {
  const { t } = useTranslation();

  return (
    <div css={styles.buttonRow}>
      <Button
        variant="primary"
        disabled={isProcessDisabled}
        onClick={handleProcess}
        style={styles.processButton}
      >
        {t("itemsMatcher.files.processBtn")}
      </Button>
      <Button
        variant="danger"
        onClick={handleClear}
        title={t("itemsMatcher.controls.clearBtn")}
      >
        ✕
      </Button>
    </div>
  );
};
