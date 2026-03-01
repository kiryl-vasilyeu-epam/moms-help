import { StrictCssObject } from '@utils';
import {
  MATCH_SPECIFIC_STYLES,
  MATCH_STATUS_ICON_MAP,
} from './StatusCell.constants';
import { styles } from './StatusCell.styles';
import { TableCellProps } from '../TableCell/TableCell.types';
import { memo } from 'react';

export const StatusCell = memo(({ item }: TableCellProps) => {
  const matchStyle: StrictCssObject[] = [
    styles.matchStatus,
    MATCH_SPECIFIC_STYLES[item.matchType],
  ];
  const icon = MATCH_STATUS_ICON_MAP[item.matchType];

  return <div css={matchStyle}>{icon}</div>;
});

StatusCell.displayName = 'StatusCell';
