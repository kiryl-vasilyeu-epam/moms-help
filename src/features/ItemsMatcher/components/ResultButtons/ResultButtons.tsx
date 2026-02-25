import { useTranslation } from 'react-i18next';
import { Button } from '@components';
import { styles } from './ResultButtons.styles';
import { ResultButtonsProps } from './ResultButtons.types';

export const ResultButtons = ({
  handleDownload,
  handleTransfer,
}: ResultButtonsProps) => {
  const { t } = useTranslation();

  return (
    <div css={styles.buttonRow}>
      <Button
        variant="success"
        onClick={handleDownload}
      >
        {t("itemsMatcher.controls.downloadBtn")}
      </Button>

      <Button
        variant="info"
        onClick={handleTransfer}
      >
        {t("itemsMatcher.controls.transferBtn")}
      </Button>
    </div>
  );
};
