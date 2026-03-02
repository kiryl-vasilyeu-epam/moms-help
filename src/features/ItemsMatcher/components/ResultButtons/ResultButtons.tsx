import { useTranslation } from 'react-i18next';
import { Button } from '@components';
import { stylesheet } from './ResultButtons.styles';
import { ResultButtonsProps } from './ResultButtons.types';
import { useStyles } from '@hooks';

export const ResultButtons = ({
  handleDownload,
  handleTransfer,
}: ResultButtonsProps) => {
  const { t } = useTranslation();
  const styles = useStyles(stylesheet);

  return (
    <div css={styles.buttonRow}>
      <Button variant="success" onClick={handleDownload}>
        {t('itemsMatcher.controls.downloadBtn')}
      </Button>

      <Button variant="info" onClick={handleTransfer}>
        {t('itemsMatcher.controls.transferBtn')}
      </Button>
    </div>
  );
};
