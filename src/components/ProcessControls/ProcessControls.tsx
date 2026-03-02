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
