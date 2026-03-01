import { styles } from './UsedItems.styles';
import type { UsedItemsProps } from './UsedItems.types';
import { DialogContent, Dialog, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const UsedItems = ({
  allUsedItems,
  resultsOpen,
  handleCloseResults,
}: UsedItemsProps) => {
  return (
    <Dialog open={resultsOpen} onClose={handleCloseResults} maxWidth="lg">
      <DialogTitle css={styles.modalTitle}>
        Сводка - Товары к удалению
        <IconButton aria-label="close" onClick={handleCloseResults}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent css={styles.container}>
        {Object.values(allUsedItems).map((item, index) => (
          <div key={index} css={styles.item}>
            <strong>{item.quantity} шт.</strong> (строка {item.rowNumber}){' '}
            {item.name}
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default UsedItems;
