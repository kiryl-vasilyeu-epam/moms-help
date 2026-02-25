
import { styles } from "./MatchCell.styles";
import { TableCellProps } from "../TableCell/TableCell.types";
import { memo } from "react";
import { useTranslation } from "react-i18next";

export const MatchCell = memo(({ item: { matchedInvNo, invNo } }: TableCellProps) => {
  const { t } = useTranslation();
  const hasMatch = !!matchedInvNo;
  const isMatchFuzzy = hasMatch && matchedInvNo !== invNo;
  const matchedInvNoStyles = [
    styles.matchedInvNo,
    isMatchFuzzy && styles.matchedInvNoFuzzy,
    !hasMatch && styles.matchedInvNoNone,
  ];

  const dataToShow = hasMatch
    ? (isMatchFuzzy ? matchedInvNo : '')
    : t('itemsMatcher.pickMatch');

  return (
    <div css={matchedInvNoStyles}>
      {dataToShow}
    </div>
  );
});

MatchCell.displayName = 'MatchCell';
