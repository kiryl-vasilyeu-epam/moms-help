import { ListCell } from "../ListCell";
import { ListRow } from "../ListRow";
import { styles } from "./ListHeader.styles";
import { ListHeaderProps } from "./ListHeader.types";

export const ListHeader = <T extends unknown>({ headerLabels, columnsWeight }: ListHeaderProps<T>) => {

  return (
    <ListRow
      variant="header"
    >
      {headerLabels.map((label, index) => (
        <ListCell
          key={label}
          width={columnsWeight[index]}
          index={index}
        >
          <div css={styles.headerCell}>
            {label}
          </div>
        </ListCell>
      ))}
    </ListRow>
  );
};
