import { createStyles } from '@utils';

export const styles = createStyles({
  row: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #ddd',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontWeight: 600,
    borderRadius: '10px 10px 0 0',
    height: 70,
  },
  even: {
    background: '#efefef',
  },
});
