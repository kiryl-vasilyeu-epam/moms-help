import { useTranslation } from 'react-i18next';
import { Button } from '@components';
import { stylesheet } from './ProcessControls.styles';
import { ProcessControlsProps } from './ProcessControls.types';
import { useStyles } from '@hooks';

export const ProcessControls = ({
  isProcessDisabled,
  handleProcess,
  handleClear,
  handleSettings,
  plural,
}: ProcessControlsProps) => {
  const { t } = useTranslation();
  const styles = useStyles(stylesheet);

  return (
    <div css={styles.container}>
      <Button
        variant="primary"
        disabled={isProcessDisabled}
        onClick={handleProcess}
        style={styles.processButton}
      >
        {plural ? t('fileUpload.processBtnPlural') : t('fileUpload.processBtn')}
      </Button>
      <div css={styles.secondaryRow}>
        <Button variant="soft" onClick={handleSettings}>
          ⚙️ {t('fileUpload.settings')}
        </Button>
        <Button variant="dangerOutline" onClick={handleClear}>
          🗑 {t('fileUpload.clear')}
        </Button>
      </div>
    </div>
  );
};
