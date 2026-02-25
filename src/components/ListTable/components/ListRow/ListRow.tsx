import { ListRowProps } from "./ListRow.types";
import { styles } from "./ListRow.styles";

export const ListRow = ({
  children,
  variant = 'row',
  height,
  even = false,
  style = []
}: ListRowProps) => {

  return (
    <div
      css={[
        styles.row,
        variant === 'header' && styles.header,
        even && styles.even,
        { height },
        ...style
      ]}
    >
      {children}
    </div>
  );
};
