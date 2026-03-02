import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    padding: '20px 12px',
    alignItems: 'center',
  },
  rowFuzzy: {
    borderTop: '3px solid #f39c12',
    borderBottom: '3px solid #f39c12',
  },
  rowManual: {
    borderTop: '3px solid #2196f3',
    borderBottom: '3px solid #2196f3',
  },
  rowUnmatched: {
    borderTop: '3px solid #e74c3c',
    borderBottom: '3px solid #e74c3c',
  },
  tooltip: {
    fontSize: 14,
  },
}));
