import { ListRowProps } from "./ListRow.types";
import { styles } from "./ListRow.styles";

export const ListRow = ({ children, variant = 'row', height, style = [] }: ListRowProps) => {

  return (
    <div css={[styles.row, variant === 'header' && styles.header, { height }, ...style]}>
      {children}
    </div>
  );
};
