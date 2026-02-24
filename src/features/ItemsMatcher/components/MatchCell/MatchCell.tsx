
import { styles } from "./MatchCell.styles";
import { TableCellProps } from "../TableCell/TableCell.types";
import { memo } from "react";

export const MatchCell = memo(({ item }: TableCellProps) => {
  const matchedInvNoStyles = [
    styles.matchedInvno,
    item.matchedInvNo && item.matchedInvNo !== item.invNo && styles.matchedInvnoHasTooltipPink,
  ];

  return (
    <div css={matchedInvNoStyles}>
      {item.matchedInvNo && item.matchedInvNo !== item.invNo ? item.matchedInvNo : ''}
    </div>
  );
});

MatchCell.displayName = 'MatchCell';
