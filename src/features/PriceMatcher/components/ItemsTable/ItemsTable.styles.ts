import { createSxStyles } from '@utils'

export const styles = createSxStyles({
  tableContainer: {
    mt: 2,
    overflowY: 'scroll',
    maxWidth: 1200,
    minWidth: 1200,
    mx: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHead: {
    background: '#667eea',
    '& th': {
      borderRight: '1px solid #e0e0e0',
      '&:last-child': {
        borderRight: 'none',
      },
    },
  },
  tableHeadCell: {
    color: 'white',
    fontWeight: 600,
    borderRight: '1px solid #e0e0e0',
    '&:last-child': {
      borderRight: 'none',
    },
  },
  tableCell: {
    fontSize: 16,
    borderRight: '1px solid #e0e0e0',
    verticalAlign: 'middle',
    '&:last-child': {
      borderRight: 'none',
    },
  },
  tableRow: {
    height: '2rem',
    '&:hover': {
      background: '#f7f7f7',
    },
  },
  trDepleted: {
    backgroundColor: '#ffcdd2',
  },
  trPartial: {
    backgroundColor: '#fff9c4',
  },
})
