import { ListCell } from '../ListCell';
import { ListRow } from '../ListRow';
import { stylesheet } from './ListHeader.styles';
import { ListHeaderProps } from './ListHeader.types';
import { useStyles } from '@hooks';

export const ListHeader = <T extends unknown, P, C>({
  headerLabels,
  columnsWeight,
}: ListHeaderProps<T, P, C>) => {
  const styles = useStyles(stylesheet);
  return (
    <ListRow variant="header">
      {headerLabels.map((label, index) => (
        <ListCell key={label} width={columnsWeight[index]} index={index}>
          <div css={styles.headerCell}>{label}</div>
        </ListCell>
      ))}
    </ListRow>
  );
};
