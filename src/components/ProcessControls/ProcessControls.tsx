import { useTranslation } from 'react-i18next';
import { Button } from '@components';
import { styles } from './ProcessControls.styles';
import { ProcessControlsProps } from './ProcessControls.types';

export const ProcessControls = ({
  isProcessDisabled,
  handleProcess,
  handleClear,
  handleSettings,
  plural,
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
        {plural ? t('fileUpload.processBtnPlural') : t('fileUpload.processBtn')}
      </Button>
      <Button variant="danger" onClick={handleClear}>
        {t('fileUpload.clear')}
      </Button>
      <Button variant="info" onClick={handleSettings}>
        {t('fileUpload.settings')}
      </Button>
    </div>
  );
};
