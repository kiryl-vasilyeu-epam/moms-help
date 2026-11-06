import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ spacing }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
  },
  index: {
    minWidth: '24px',
    textAlign: 'right',
  },
  amount: {
    flex: 1,
    minWidth: '120px',
  },
  tolerance: {
    width: '110px',
  },
  approxToggle: {
    marginLeft: 0,
    marginRight: 0,
    whiteSpace: 'nowrap',
  },
  meta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingLeft: '32px',
  },
  calculated: {
    opacity: 0.55,
    transition: 'opacity 0.15s',
    '&:hover, &:focus-within': {
      opacity: 1,
    },
  },
}));
