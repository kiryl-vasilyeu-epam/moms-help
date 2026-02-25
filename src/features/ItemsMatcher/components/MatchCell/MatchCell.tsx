
import { styles } from "./MatchCell.styles";
import { TableCellProps } from "../TableCell/TableCell.types";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

export const MatchCell = forwardRef<HTMLDivElement, Pick<TableCellProps, 'item'>>(
  (props, ref) => {
    const {
      item: { invNo, matchedInvNo },
      ...tooltipProps
    } = props;
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
      <div
        css={matchedInvNoStyles}
        ref={ref}
        {...tooltipProps}
      >
        {dataToShow}
      </div>
    );
  });

MatchCell.displayName = 'MatchCell';
