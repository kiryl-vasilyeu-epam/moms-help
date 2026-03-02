import { stylesheet } from './ListCell.styles';
import { ListCellProps } from './ListCell.types';
import { useStyles } from '@hooks';

export const ListCell = ({ children, width, index }: ListCellProps) => {
  const styles = useStyles(stylesheet);
  return (
    <div css={[styles.cell, index && styles.border, { flexGrow: width }]}>
      {children}
    </div>
  );
};
