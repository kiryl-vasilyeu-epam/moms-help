import { styles } from './UsedItems.styles';
import type { UsedItemsProps } from './UsedItems.types';
import { DialogContent, Dialog, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

const UsedItems = ({
  allUsedItems,
  resultsOpen,
  handleCloseResults,
}: UsedItemsProps) => {
  const { t } = useTranslation();
  return (
    <Dialog open={resultsOpen} onClose={handleCloseResults} maxWidth="lg">
      <DialogTitle css={styles.modalTitle}>
        {t('priceMatcher.usedItems.title')}
        <IconButton aria-label="close" onClick={handleCloseResults}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent css={styles.container}>
        {Object.values(allUsedItems).map((item, index) => (
          <div key={index} css={styles.item}>
            <strong>
              {item.quantity} {t('priceMatcher.usedItems.pcs')}
            </strong>{' '}
            ({t('priceMatcher.usedItems.row')} {item.rowNumber}) {item.name}
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default UsedItems;
