import { stylesheet } from './MatchCell.styles';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MatchCellProps } from './MatchCell.types';
import { useStyles } from '@hooks';

export const MatchCell = forwardRef<HTMLDivElement, MatchCellProps>(
  (props, ref) => {
    const {
      item: { invNo, matchedInvNo },
      cellCommonProps,
      index,
      ...tooltipProps
    } = props;
    const { t } = useTranslation();
    const styles = useStyles(stylesheet);
    const hasMatch = !!matchedInvNo;
    const isMatchFuzzy = hasMatch && matchedInvNo !== invNo;
    const matchedInvNoStyles = [
      styles.matchedInvNo,
      isMatchFuzzy && styles.matchedInvNoFuzzy,
      !hasMatch && styles.matchedInvNoNone,
    ];

    const dataToShow = hasMatch
      ? isMatchFuzzy
        ? matchedInvNo
        : ''
      : t('itemsMatcher.pickMatch');

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) =>
      cellCommonProps?.handleSelectMatchItem({
        anchor: event?.currentTarget,
        itemIndex: index,
      });

    return (
      <div
        css={matchedInvNoStyles}
        ref={ref}
        onClick={handleClick}
        {...tooltipProps}
      >
        {dataToShow}
      </div>
    );
  },
);

MatchCell.displayName = 'MatchCell';
