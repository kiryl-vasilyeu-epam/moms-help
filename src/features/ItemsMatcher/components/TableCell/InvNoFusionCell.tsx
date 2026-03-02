import { Tooltip } from '@mui/material';
import type { StrictCssObjectWithSelectors } from '@utils';
import { MatchCell } from '../MatchCell';
import { TableCellProps } from './TableCell.types';

interface InvNoFusionCellProps extends TableCellProps {
  tooltipStyle: StrictCssObjectWithSelectors;
}

export const InvNoFusionCell = ({
  item,
  rowIndex,
  cellCommonProps,
  tooltipStyle,
}: InvNoFusionCellProps) => (
  <Tooltip
    title={
      item.matchedItem?.rawData && (
        <div css={tooltipStyle}>{item.matchedItem?.rawData}</div>
      )
    }
    enterNextDelay={800}
    arrow
  >
    <MatchCell item={item} index={rowIndex} cellCommonProps={cellCommonProps} />
  </Tooltip>
);
