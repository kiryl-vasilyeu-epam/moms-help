import { ListRowProps } from './ListRow.types';
import { stylesheet } from './ListRow.styles';
import { useStyles } from '@hooks';

export const ListRow = ({
  children,
  variant = 'row',
  height,
  even = false,
  style = [],
}: ListRowProps) => {
  const styles = useStyles(stylesheet);
  return (
    <div
      css={[
        styles.row,
        variant === 'header' && styles.header,
        even && styles.even,
        { height },
        ...style,
      ]}
    >
      {children}
    </div>
  );
};
