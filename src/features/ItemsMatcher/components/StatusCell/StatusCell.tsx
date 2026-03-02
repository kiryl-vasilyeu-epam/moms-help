import { StrictCssObject } from '@utils';
import {
  getMatchSpecificStyles,
  MATCH_STATUS_ICON_MAP,
} from './StatusCell.constants';
import { stylesheet } from './StatusCell.styles';
import { TableCellProps } from '../TableCell/TableCell.types';
import { memo } from 'react';
import { useStyles } from '@hooks';

export const StatusCell = memo(({ item }: TableCellProps) => {
  const styles = useStyles(stylesheet);
  const matchSpecificStyles = getMatchSpecificStyles(styles);
  const matchStyle: StrictCssObject[] = [
    styles.matchStatus,
    matchSpecificStyles[item.matchType],
  ];
  const icon = MATCH_STATUS_ICON_MAP[item.matchType];

  return <div css={matchStyle}>{icon}</div>;
});

StatusCell.displayName = 'StatusCell';
