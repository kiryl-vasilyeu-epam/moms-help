import { createStyles } from '@utils';

export const styles = createStyles(({ colors }) => ({
  cell: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    flexBasis: 0,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'wrap',
  },
  border: {
    borderLeft: `1px solid ${colors.border}`,
  },
}));
