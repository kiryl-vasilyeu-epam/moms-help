import { styles } from "./ListCell.styles";
import { ListCellProps } from "./ListCell.types";


export const ListCell = ({ children, width, index }: ListCellProps) => {

  return (
    <div css={[styles.cell, index && styles.border, { flexGrow: width }]}>
      {children}
    </div>
  );
};
